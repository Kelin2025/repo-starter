/// <reference path="./.sst/platform/config.d.ts" />

const PROJECT_NAME = "repo-starter";
const POSTGRES_LOCALHOST = "postgres.repo-starter.orb.local";

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
      },
    };
  },
  async run() {
    // Create VPC for RDS
    const vpc = new sst.aws.Vpc("VPC", {
      nat: "ec2",
    });

    // PostgreSQL database
    const database = new sst.aws.Postgres("PostgresDatabase", {
      vpc,
      dev: {
        host: POSTGRES_LOCALHOST,
        username: "postgres",
        password: "password",
        database: "local",
        port: 5432,
      },
    });

    // API
    const api = new sst.aws.Function("Api", {
      vpc,
      url: true,
      link: [database],
      handler: "packages/backend/src/index.handler",
      runtime: "nodejs20.x",
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

    // Drizzle dev
    new sst.x.DevCommand("Studio", {
      link: [database],
      dev: {
        command: "cd packages/backend && bunx drizzle-kit studio",
      },
    });

    // Drizzle-kit init
    new sst.x.DevCommand("DrizzleGenerate", {
      link: [database],
      dev: {
        autostart: false,
        directory: "packages/backend",
        command: "bunx drizzle-kit generate",
      },
    });

    // Migration command
    new sst.x.DevCommand("DrizzleMigrate", {
      link: [database],
      dev: {
        autostart: false,
        directory: "packages/backend",
        command: "bunx drizzle-kit migrate",
      },
    });

    return {
      api: api.url,
      web: web.url,
    };
  },
});
