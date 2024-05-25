import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";

const Blogs = () => {
  const { blogs, loading } = useBlogs();

  //TODO: Create Skeleton loading page
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div className="flex justify-center">
        <div className="">
          {blogs.map((blog) => {
            return (
              <BlogCard
                autherName={blog.author.name || "Anonymus"}
                title={blog.title}
                content={blog.content}
                publishedDate={"25th May 2024"}
                id={blog.id}
                key={blog.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
