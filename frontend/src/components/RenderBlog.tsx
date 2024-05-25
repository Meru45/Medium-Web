import { Blog } from "../hooks/useBlog";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const RenderBlog = ({ blog }: Blog) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full pt-12 px-10  max-w-screen-2xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold cursor-default">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2 cursor-default">
              25th May 2023
            </div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg pb-2 cursor-default">
              Author
            </div>
            <div className="flex">
              <div className="flex justify-center flex-col pr-4 cursor-pointer">
                <Avatar autherName={blog.author.name} size="big" />
              </div>
              <div>
                <div className="flex justify-center flex-col text-xl font-bold cursor-default">
                  {blog.author.name}
                </div>

                <div className="pt-2 cursor-default">
                  Random catch pharse about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
