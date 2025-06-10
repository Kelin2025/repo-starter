import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Resource } from "sst";
import * as schema from "./schema";

const connectionString = `postgresql://${Resource.PostgresDatabase.username}:${Resource.PostgresDatabase.password}@${Resource.PostgresDatabase.host}:${Resource.PostgresDatabase.port}/${Resource.PostgresDatabase.database}?sslmode=disable`;

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
