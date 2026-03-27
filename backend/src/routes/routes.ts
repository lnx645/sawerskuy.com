import { authLoginHandler } from "@/handlers/api/auth-login.handler";
import indexHandler from "@/handlers/index.handler";
export default {
  "/" : indexHandler(),
  "/api/auth/login": authLoginHandler
};
