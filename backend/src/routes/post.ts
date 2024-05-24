import { Hono } from "hono";
import authMiddleware from "../middlewares/authMiddleware";
const postRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };

  Variables: {
    user: any;
    post: any;
    userId: string;
  };
}>();

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

postRouter.put("/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    c.status(400);
    return c.json({ msg: "Please put the id of the post in the param" });
  }
  const body = await c.req.json();
  if (!body.title || !body.content) {
    c.status(400);
    return c.json({ msg: "Title/Content cannot be empty" });
  }
  const Post = c.get("post");
  const userId = c.get("userId");

  try {
    await Post.update({
      where: {
        id: id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    c.status(200);
    return c.json({ msg: "Post updated" });
  } catch (error) {
    c.status(500);
    return c.json({ msg: "Error occured while updating the post in database" });
  }
});

postRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const Post = c.get("post");
  try {
    const post = await Post.findFirst({
      where: {
        id: id,
      },
    });
    c.status(400);
    return c.json({ post });
  } catch (error) {
    c.status(500);
    return c.json({
      msg: `Error occured while fetching the post with id ${id}`,
    });
  }
});

//TODO: Add pagination
postRouter.get("/", async (c) => {
  const Post = c.get("post");
  console.log(Post);
  try {
    const posts = await Post.findMany({});
    c.status(400);
    return c.json({ posts });
  } catch (error) {
    c.status(500);
    return c.json({ msg: "Error occured while fetching posts" });
  }
});

export default postRouter;
