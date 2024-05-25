import { Link } from "react-router-dom";

interface BlogCardProps {
  autherName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  autherName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md">
      <div className="flex">
        <Avatar autherName={autherName} size={"small"} />
        <div className="font-extralight px-2 text-sm flex justify-center flex-col cursor-default">
          {autherName.charAt(0).toUpperCase() + autherName.slice(1)}
        </div>
        <div className="flex justify-center flex-col cursor-default">
          <div className="h-1 w-1 rounded-full bg-slate-500"></div>
        </div>
        <div className="font-thin pl-2 text-slate-400 text-sm flex justify-center flex-col cursor-default">
          {publishedDate}
        </div>
      </div>
      <Link to={`/blog/${id}`}>
        <div className="text-xl font-semibold pt-2 cursor-pointer">{title}</div>
      </Link>
      <div className="text-md font-thin cursor-default">
        {content.slice(0, 100) + "..."}
      </div>
      <div className="text-slate-500 text-sm font-thin pt-3 cursor-default">{`${Math.ceil(content.length / 150)} min read`}</div>
    </div>
  );
};

export const Avatar = ({
  autherName,
  size,
}: {
  autherName: string;
  size: "small" | "big";
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span
        className={`font-extralight ${size === "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}
      >
        {autherName.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
