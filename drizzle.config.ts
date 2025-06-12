import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  dialect: "postgresql",
  schema: "./packages/backend/src/db/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: Resource.SupabaseUrl.value,
  },
  schemaFilter: ["public"],
  verbose: true,
  strict: true,
});
