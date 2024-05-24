interface BlogCardProps {
  autherName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  autherName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="p-4 border-b border-slate-200 pb-4">
      <div className="flex">
        <Avatar autherName={autherName} size={6} />
        <div className="font-extralight px-2 text-sm flex justify-center flex-col">
          {autherName.charAt(0).toUpperCase() + autherName.slice(1)}
        </div>
        <div className="flex justify-center flex-col">
          <div className="h-1 w-1 rounded-full bg-slate-500"></div>
        </div>
        <div className="font-thin pl-2 text-slate-400 text-sm flex justify-center flex-col">
          {publishedDate}
        </div>
      </div>
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-slate-500 text-sm font-thin pt-3">{`${Math.ceil(content.length / 150)} min read`}</div>
    </div>
  );
};

export const Avatar = ({
  autherName,
  size = 6,
}: {
  autherName: string;
  size: number;
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span
        className={`font-extralight ${size === 6 ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}
      >
        {autherName.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
