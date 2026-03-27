import type { WebsocketDataType } from "@/types/common";


declare module "bun" {
  interface Env {
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    LOG_PATH:string;
    WEBSOCKET_PATH: string;
    APP_HOST: string;
    APP_PORT: string;
  }
}
