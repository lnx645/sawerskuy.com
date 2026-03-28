import { authLoginHandler } from "@/handlers/api/auth-login.handler";
import indexHandler from "@/handlers/index.handler";
import type { WebsocketDataType } from "@/types/common";
import type { Serve } from "bun";
export default {
  '/api/v2/user/login' : new Response("V2"),
} satisfies Serve.Routes<WebsocketDataType, any>;
