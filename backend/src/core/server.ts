import routes from "@/routes/routes";
import { serve } from "bun";

type WSData = {
  secret: string|null;
  token: string|null;
  path:string|null
};
declare global {
  var server: Bun.Server<WSData>;
}
export class Server {
  server: Bun.Server<undefined> | any;
  async RunServer() {
    let serv = serve<WSData>({
      hostname: process.env.APP_HOST,
      port: process.env.APP_PORT,
      idleTimeout: 10,
      routes: routes,
      fetch(req, server) {
        let url = new URL(req.url);
        if (url.pathname.startsWith(process.env.WEBSOCKET_PATH)) {
          server.upgrade(req, {
            data : {
              secret: url.searchParams.get('secret'),
              token : url.searchParams.get('token'),
              path : url.pathname,
            },
          });
          return;
        }
        return new Response("WebSocket upgrade failed", { status: 500 });
      },
      websocket: {
        open(ws) {
          console.log(ws.data);
          
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
    globalThis.server = serv;
    console.log("🌐 Server running at: 3000");
  }
}
