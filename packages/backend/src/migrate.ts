export const handler = async () => {
  try {
    console.log("Running migrations from Lambda handler...");
    
    // Dynamic imports to avoid execution during bundling
    const { migrate } = await import("drizzle-orm/postgres-js/migrator");
    const { db } = await import("./db/index.js");
    
    await migrate(db, { migrationsFolder: "./drizzle/migrations" });
    console.log("Migrations completed!");
    
    return { 
      statusCode: 200, 
      body: JSON.stringify({ success: true, message: "Migrations completed successfully" })
    };
  } catch (error: any) {
    console.error("Migration failed:", error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};