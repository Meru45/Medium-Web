import { Hono } from "hono";

const postRouter = new Hono();

postRouter.post("/", (c) => {
  return c.json({ msg: "this is the blog route" });
});

postRouter.put("/", (c) => {
  return c.json({ msg: "this is the blog route" });
});

postRouter.get("/:id", (c) => {
  return c.json({ msg: "this is the blog route" });
});

export default postRouter;
