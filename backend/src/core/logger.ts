import fs from "fs";

const LOG_PATH = Bun.env.LOG_PATH || "logs/app.log";

function ensureLogDir() {
  const dir = LOG_PATH.split("/").slice(0, -1).join("/");
  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function formatMessage(level: string, message: string) {
  return `[${new Date().toISOString()}] [${level}] ${message}\n`;
}

async function writeLog(content: any) {
  ensureLogDir();
  await Bun.write(LOG_PATH, content, { append: true } as any);
}

// public logger
export async function log(message: string) {
  await writeLog(formatMessage("INFO", message));
}

export async function logError(error: any) {
  const msg = error?.stack || error?.message || String(error);
  await writeLog(
    formatMessage(
      "ERROR",
      `${msg}\n----------------------------------------`
    )
  );
}