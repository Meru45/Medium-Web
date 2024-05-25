import { Hono } from "hono";
import { createBlogInput, updateBlogInput } from "@meru_2802/blogs-common";
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

//TODO: Add publish end point

postRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = await createBlogInput.safeParseAsync(body);
  if (!success) {
    c.status(400);
    return c.json({ msg: "Incorrect inputs" });
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
  const { success } = await updateBlogInput.safeParseAsync(body);
  if (!success) {
    c.status(400);
    return c.json({ msg: "Incorrect inputs" });
  }

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

postRouter.get("/getpost/:id", async (c) => {
  const id = c.req.param("id");
  if (!id) {
    c.status(400);
    return c.json({ msg: "Please put the id of the post in the param" });
  }

  const Post = c.get("post");
  try {
    const post = await Post.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({ post });
  } catch (error) {
    c.status(500);
    return c.json({
      msg: `Error occured while fetching the post with id ${id}`,
    });
  }
});

//TODO: Add pagination
postRouter.get("/bulk", async (c) => {
  const Post = c.get("post");

  try {
    const posts = await Post.findMany({
      where: {},
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({ posts: posts });
  } catch (error) {
    c.status(500);
    return c.json({ msg: "Error occured while fetching posts" });
  }
});

export default postRouter;
