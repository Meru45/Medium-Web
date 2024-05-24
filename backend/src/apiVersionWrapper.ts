import { Hono } from "hono";
import userRouter from "./routes/user";
import postRouter from "./routes/post";

const versionWrapper = new Hono();

versionWrapper.route("/user", userRouter);
versionWrapper.route("/blog", postRouter);

export default versionWrapper;
