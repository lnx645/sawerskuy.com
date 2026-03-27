import routes from "@/routes/routes";
import type { WebsocketDataType } from "@/types/common";
import { serve } from "bun";
import { log } from "./logger";

declare global {
  var server: Bun.Server<WebsocketDataType>;
}

export async function RunServer() {
  let serverInstance = serve<WebsocketDataType>({
    hostname: process.env.APP_HOST,
    port: process.env.APP_PORT,
    idleTimeout: 10,
    routes: routes,
    fetch(req, server) {
      let url = new URL(req.url);
      log(`${new Date()} ${req.method} ${url.pathname} SUCCESS \n`);
      if (url.pathname.startsWith(process.env.WEBSOCKET_PATH)) {
        const upgraded = server.upgrade(req, {
          data: {
            secret: url.searchParams.get("secret"),
            token: url.searchParams.get("token"),
            path: url.pathname,
          },
        });
        if (!upgraded) {
          return new Response("WebSocket upgrade failed", { status: 500 });
        }
      }
      return new Response("Hello world");
    },
    websocket: {
      open(ws) {
        ws.subscribe(ws.data.token!);
      },
      message: function (ws) {
        ws.publish("chat:91", "Jalan");
      },
      close(ws, code, reason) {
        ws.unsubscribe(ws.data.token!);
      },
    },
  });
  if (!globalThis.server) {
    globalThis.server = serverInstance;
  }
  console.log("🌐 Server running at: 3000");
}
export const getServer = () => {
  return globalThis.server;
};
export {};
