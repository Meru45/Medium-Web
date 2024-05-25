import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="py-4 border-b flex justify-between px-10">
      <div className="flex justify-center flex-col cursor-pointer">
        <Link to="/blogs">Medium</Link>
      </div>
      <div className="flex justify-between">
        <Link to="/publish">
          <button
            type="button"
            className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          >
            New
          </button>
        </Link>
        <div className="cursor-pointer">
          <Avatar autherName={"Mayur"} size={"big"} />
        </div>
      </div>
    </div>
  );
};
