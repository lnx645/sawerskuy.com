import type { BunRequest } from "bun";
export const authLoginHandler = (req: BunRequest<"/api/auth/login">) => {
  return Response.json({
    status: true,
  });
};
