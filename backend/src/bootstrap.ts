import { SetupDatabaseConnection } from "@/core/database/connection";
import { RunServer } from "@/core/server";
import { log, logError } from "@/core/logger";
export async function bootstrap() {
  try {
    console.log("🚀 Starting Server");
    await SetupDatabaseConnection();
    console.log("✅ Database Connected");
    await RunServer();
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
