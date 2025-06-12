/// <reference path="./.sst/platform/config.d.ts" />

const PROJECT_NAME = "repo-starter";

export default $config({
  app(input) {
    return {
      name: PROJECT_NAME,
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: "default",
          region: "eu-central-1",
        },
        supabase: "1.4.1",
      },
    };
  },
  async run() {
    // Supabase database configuration
    const supabaseDatabaseUrl = new sst.Secret(
      "SupabaseUrl",
      process.env.SUPABASE_URL!
    );

    // API
    const api = new sst.aws.Function("Api", {
      url: true,
      link: [supabaseDatabaseUrl],
      handler: "packages/backend/src/index.handler",
      runtime: "nodejs20.x",
      copyFiles: [
        {
          from: "drizzle",
          to: "drizzle",
        },
      ],
      nodejs: {
        loader: {
          ".node": "file",
        },
      },
    });

    // Frontend
    const web = new sst.aws.StaticSite("Web", {
      dev: {
        command: 'bun run --filter "./packages/website" dev',
      },
      build: {
        command: 'bun run --filter "./packages/website" build',
        output: "packages/website/dist",
      },
      environment: {
        VITE_API_URL: api.url,
      },
    });

    // Drizzle-kit init
    new sst.x.DevCommand("DrizzleGenerate", {
      link: [supabaseDatabaseUrl],
      dev: {
        command: "drizzle-kit generate",
      },
    });

    // Migration Lambda for production
    const migrationFunction = new sst.aws.Function("MigrationFunction", {
      link: [supabaseDatabaseUrl],
      handler: "packages/backend/src/migrate.handler",
      runtime: "nodejs20.x",
      timeout: "5 minutes",
      copyFiles: [
        {
          from: "drizzle",
          to: "drizzle",
        },
      ],
      nodejs: {
        loader: {
          ".node": "file",
        },
      },
    });

    return {
      api: api.url,
      web: web.url,
      migration: migrationFunction.name,
    };
  },
});
