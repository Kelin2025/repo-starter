#!/usr/bin/env bun
import { Resource } from "sst";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const client = new LambdaClient({
  region: process.env.AWS_REGION || "eu-central-1",
});

async function runMigration() {
  try {
    console.log("Running production migrations...");
    
    const command = new InvokeCommand({
      FunctionName: Resource.MigrationFunction.name,
      InvocationType: "RequestResponse",
    });
    
    const response = await client.send(command);
    const payload = response.Payload ? 
      JSON.parse(new TextDecoder().decode(response.Payload)) : 
      null;
    
    if (response.StatusCode === 200 && payload?.statusCode === 200) {
      console.log("✅ Migrations completed successfully");
      const body = JSON.parse(payload.body);
      console.log(body.message);
    } else {
      console.error("❌ Migration failed");
      console.error(payload);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error invoking migration function:", error);
    process.exit(1);
  }
}

runMigration();