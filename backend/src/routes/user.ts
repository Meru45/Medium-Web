import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@meru_2802/blogs-common";

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
  const dataCheck = await signupInput.safeParseAsync(body);
  if (!dataCheck.success) {
    c.status(400);
    return c.json({ msg: "Wrong signup inputs" });
  }

  const User = c.get("user");
  try {
    //TODO: Add password hashing in the database
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
    c.status(403);
    return c.json({ success: false, msg: "Error while Signing Up" });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = await signinInput.safeParseAsync(body);
  if (!success) {
    c.status(400);
    return c.json({ msg: "Wrong signup inputs" });
  }

  const User = c.get("user");
  try {
    const user = await User.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      c.status(404);
      return c.json({ msg: "User does not exists" });
    }
    //TODO: Compare password using bcrypt like library
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
    c.status(403);
    return c.json({ success: false, msg: "Error while Signing In" });
  }
});

export default userRouter;
