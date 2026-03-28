import type { WebsocketDataType } from "@/types/common";
import { serve } from "bun";
import options from "./options";
import v2routes from "@/routes/v2routes";

declare global {
  var server: Bun.Server<WebsocketDataType>;
}
export async function InitializeServer() {
  let serverInstance = serve<WebsocketDataType>(options);
  if (!globalThis.server) {
    globalThis.server = serverInstance;
  }
  console.log("🌐 Server running at: 3000");
}
export const getServer = () => {
  return globalThis.server;
};
export {};
