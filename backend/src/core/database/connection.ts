import { prisma } from "./prisma";

async function SetupDatabaseConnection() {
  try {
    await prisma.$connect();
    return true;
  } catch (error) {
    console.error("❌ Gagal terhubung ke Database:", (error as any).message);
    process.exit(1);
  }
}
export { SetupDatabaseConnection };
