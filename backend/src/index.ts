import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

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

app.use("/app/v1/blog/*", async (c, next) => {
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

app.post("/api/v1/signup", async (c) => {
  const body = await c.req.json();
  const User = c.get("user");
  try {
    const newUser = await User.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });

    const payload = {
      id: newUser.id,
      exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 15,
    };

    const token = await sign(payload, c.env.JWT_SECRET);
    return c.json({ jwt: token });
  } catch (error) {
    return c.status(403);
  }
});

app.post("/api/v1/signin", async (c) => {
  const body = await c.req.json();
  const User = c.get("user");
  try {
    const user = await User.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      c.status(404);
      return c.json({ msg: "User does not exists" });
    }
    if (user.password == body.password) {
      const payload = {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 15,
      };

      const token = await sign(payload, c.env.JWT_SECRET);
      return c.json({ jwt: token });
    } else {
      c.status(401);
      return c.json({ msg: "Invalid password" });
    }
  } catch (error) {
    c.status(500);
    return c.json({ msg: "Database error" });
  }
});

app.post("/api/v1/blog", (c) => {
  return c.json({ msg: "this is the blog route" });
});
app.put("/api/v1/blog", (c) => {
  return c.json({ msg: "this is the blog route" });
});
app.get("/api/v1/blog/:id", (c) => {
  return c.json({ msg: "this is the blog route" });
});

export default app;
