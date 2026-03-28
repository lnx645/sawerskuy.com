import { SetupDatabaseConnection } from "@/core/database/connection";
import { InitializeServer } from "@/core/server/server";
import { log, logError } from "@/core/logger";
import v2routes from "./routes/v2routes";
import { prisma } from "./core/database/prisma";
export async function bootstrap() {
  try {
    console.log("🚀 Starting Server");
    await SetupDatabaseConnection();
    console.log("✅ Database Connected");
    await InitializeServer();  
  } catch (error) {
    await logError(error as any);
    console.error((error as any).message);
    console.log("❌ Failed To Start Server");
    process.exit(1);
  } finally {
    console.log("✅ Server Started");
    log("✅ Server Started");
  }
}
