import { RenderBlog } from "../components/RenderBlog";
import { useBlog } from "../hooks/useBlog";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: parseInt(id) });

  //TODO: Create skeleton loading page
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <RenderBlog blog={blog} />
    </div>
  );
};

export default Blog;
