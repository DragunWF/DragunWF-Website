import { useState, useEffect } from "react";
import styles from "./Blog.module.css";
import Card from "../components/Card";
import Title from "../components/Title";
import Description from "../components/Description";
import BlogCard from "../components/BlogCard";
import BlogPagination from "../components/BlogPagination";
import Loader from "../components/Loader";

// for testing
const baseUrl = "http://localhost:9000/blogs";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(function () {
    async function fetchBlogs() {
      try {
        setIsLoading(true);
        const res = await fetch(baseUrl);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      {isError && (
        <Card>
          <Title>Something went wrong!</Title>
          <Description>
            An unexpected error occurred while retrieving the blog data. Please
            try again later.
          </Description>
        </Card>
      )}
      {!isError &&
        blogs.map((blog) => {
          return (
            <BlogCard
              title={blog.title}
              description={blog.content}
              key={blog.title}
            />
          );
        })}
      {blogs.length > 0 && <BlogPagination />}
    </div>
  );
}

export default Blog;
