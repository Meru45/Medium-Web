import { Hono } from "hono";

import { sign } from "hono/jwt";

const userRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };

  Variables: {
    user: any;
    post: any;
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
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

userRouter.post("/signin", async (c) => {
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

export default userRouter;
