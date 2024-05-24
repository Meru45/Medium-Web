import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import versionWrapper from "./apiVersionWrapper";
import authMiddleware from "./middlewares/authMiddleware";

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

app.use("/api/v1/blog/*", authMiddleware);

app.route("/api/v1", versionWrapper);

export default app;
