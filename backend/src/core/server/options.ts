import routes from "@/routes/routes";
import type { WebsocketDataType } from "@/types/common";
import type { Serve } from "bun";
import { log } from "../logger";

export default {
  hostname: process.env.APP_HOST,
  port: process.env.APP_PORT,
  idleTimeout: 10,
  routes: routes,
  //fetch
  fetch(req, server) {
    let url = new URL(req.url);
    log(`${new Date()} ${server.requestIP(req)?.address} ${req.method} ${url.pathname} SUCCESS \n`);
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
    return new Response("404!");
  },
  //fetch
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
      },
    });
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
} satisfies Serve.Options<WebsocketDataType,any>;