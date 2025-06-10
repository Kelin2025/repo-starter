import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "drizzle/migrations",
  dbCredentials: {
    host: Resource.PostgresDatabase.host,
    port: Resource.PostgresDatabase.port,
    user: Resource.PostgresDatabase.username,
    password: Resource.PostgresDatabase.password,
    database: Resource.PostgresDatabase.database,
    ssl: false,
  },
});
