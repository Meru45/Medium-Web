import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";

const Blog = () => {
  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div className="flex justify-center">
        <div className="max-w-xl">
          <BlogCard
            autherName="Mayur Pachpor"
            title="How an ugly single page website makes $5000 a month without affiliate marketting?"
            content="THow an ugly single page website makes $5000 a month without affiliate marketting?How an ugly single page website makes $5000 a month without affiliate marketting?his is the first blog i am writting"
            publishedDate="25th May 2024"
          />
          <BlogCard
            autherName="Mayur Pachpor"
            title="How an ugly single page website makes $5000 a month without affiliate marketting?"
            content="THow an ugly single page website makes $5000 a month without affiliate marketting?How an ugly single page website makes $5000 a month without affiliate marketting?his is the first blog i am writting"
            publishedDate="25th May 2024"
          />
          <BlogCard
            autherName="Mayur Pachpor"
            title="How an ugly single page website makes $5000 a month without affiliate marketting?"
            content="THow an ugly single page website makes $5000 a month without affiliate marketting?How an ugly single page website makes $5000 a month without affiliate marketting?his is the first blog i am writting"
            publishedDate="25th May 2024"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
