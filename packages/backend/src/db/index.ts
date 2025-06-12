import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Resource } from "sst";
import * as schema from "./schema";

const client = postgres(Resource.SupabaseUrl.value, { prepare: false });
export const db = drizzle(client, { schema });
