import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="py-4 border-b flex justify-between px-10">
      <div className="flex justify-center flex-col">Medium</div>
      <div>
        <Avatar autherName={"Mayur"} size={10} />
      </div>
    </div>
  );
};
