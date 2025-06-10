import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

let migrationPromise: Promise<void> | null = null;
if (
  process.env.NODE_ENV === "production" ||
  process.env.AWS_LAMBDA_FUNCTION_NAME
) {
  migrationPromise = (async () => {
    try {
      console.log("Running automatic migrations...");
      const { migrate } = await import("drizzle-orm/postgres-js/migrator");
      await migrate(db, { migrationsFolder: "./drizzle/migrations" });
      console.log("Migrations completed successfully");
    } catch (error) {
      console.error("Migration failed:", error);
      throw error;
    }
  })();
}

const app = new Elysia()
  .onBeforeHandle(async () => {
    // Wait for migrations to complete before serving requests
    if (migrationPromise) {
      await migrationPromise;
    }
  })
  .get("/api", () => "Hello World!")
  .get("/api/users", async () => {
    const allUsers = await db.select().from(users);
    return allUsers;
  })
  .post("/api/users", async ({ body }) => {
    const newUser = await db
      .insert(users)
      .values(body as any)
      .returning();
    return newUser[0];
  });

// For local development
if (import.meta.env?.DEV || process.env.NODE_ENV === "development") {
  app.listen(3000);
  console.log(`Server is running on http://localhost:3000`);
}

// Lambda handler
export const handler = async (event: any) => {
  // Convert Lambda event to Request
  const url = new URL(
    event.rawPath || event.path || "/",
    `https://${event.headers?.host || "localhost"}`
  );

  // Add query parameters
  if (event.queryStringParameters) {
    Object.entries(event.queryStringParameters).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }

  const request = new Request(url.toString(), {
    method: event.httpMethod || event.requestContext?.http?.method || "GET",
    headers: event.headers || {},
    body: event.body || undefined,
  });

  try {
    const response = await app.fetch(request);

    return {
      statusCode: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: await response.text(),
      isBase64Encoded: false,
    };
  } catch (error) {
    console.error("Handler error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
