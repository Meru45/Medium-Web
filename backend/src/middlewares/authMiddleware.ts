import { Context, Next } from "hono";
import { verify } from "hono/jwt";

async function authMiddleware(c: Context, next: Next) {
  //in hono this syntax is used to add middleware on all routes of /api/v1/blog we use * after that
  //get the auth header
  const authHeader = c.req.header("authorization");
  if (!authHeader) {
    c.status(400);
    return c.json({ msg: "No auth header" });
  }
  if (!authHeader.startsWith("Bearer")) {
    c.status(400);
    return c.json({ msg: "You have to send a 'Bearer' token" });
  }

  //extracting the token from authHeader
  const token = authHeader.split(" ")[1];

  //verigy header
  const decoded = await verify(token, c.env.JWT_SECRET);
  if (!decoded.id) {
    c.status(403);
    return c.json({ msg: "unauthorized" });
  } else {
    c.set("userId", decoded.id);
    await next();
  }
}

export default authMiddleware;
