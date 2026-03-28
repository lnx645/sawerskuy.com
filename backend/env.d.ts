import type { WebsocketDataType } from "@/types/common";


declare module "bun" {
  interface Env {
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_NAME: string;
    DATABASE_USER: string;
    DATABASE_PASS: string;
    DATABSE_URL : string,
    LOG_PATH:string;
    WEBSOCKET_PATH: string;
    APP_HOST: string;
    APP_PORT: string;
  }
}
