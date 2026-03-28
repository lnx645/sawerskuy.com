import { prisma } from "@/core/database/prisma";
import { authLoginHandler } from "@/handlers/api/auth-login.handler";
import indexHandler from "@/handlers/index.handler";
import type { WebsocketDataType } from "@/types/common";
import type { BunRequest, Serve } from "bun";
export default {
  "/": indexHandler(),
  "/api/auth/login": {
    POST: authLoginHandler,
  },
  "/api/users/:id": async (e: BunRequest<"/api/users/:id">) => {
    let data = await prisma.user.findMany({
      where : {
        id : 2
      }
    })
    return Response.json(data);
  },
} satisfies Serve.Routes<WebsocketDataType, any>;
