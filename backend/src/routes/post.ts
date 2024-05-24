import { Hono } from "hono";
import authMiddleware from "../middlewares/authMiddleware";
const postRouter = new Hono();

postRouter.use("/*", authMiddleware);
postRouter.post("/", async (c) => {
  const body = await c.req.json();
  if (!body.title || !body.content) {
    c.status(400);
    return c.json({ msg: "Title/Content cannot be empty" });
  }
  const Post = c.get("post");
  const userId = c.get("userId");
  try {
    const newPost = await Post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    c.status(201);
    return c.json({ msg: `Post with title ${newPost.title} created!` });
  } catch (error) {
    c.status(500);
    return c.json({ msg: "Error occured while creating blogs" });
  }
});

postRouter.put("/", (c) => {
  return c.json({ msg: "this is the blog route" });
});

postRouter.get("/:id", (c) => {
  return c.json({ msg: "this is the blog route" });
});

export default postRouter;
