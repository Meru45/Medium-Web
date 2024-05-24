import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import versionWrapper from "./apiVersionWrapper";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//we are adding the prisma client to every request by create global middleware
app.use("/*", async (c, next) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    c.set("user", prisma.user);
    c.set("post", prisma.post);
    await next();
  } catch (error) {
    c.status(500);
    c.json({ msg: "Error occured while connecting to the database" });
  }
});

app.use("/api/v1/blog/*", async (c, next) => {
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
    await next();
  }
});

app.route("/api/v1", versionWrapper);

export default app;
