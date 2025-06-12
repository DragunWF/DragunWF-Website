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
  const blogPostsPerPage = 3;

  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  function handleUpdateCurrentPage(pageCount) {
    setCurrentPage(pageCount);
    setVisibleBlogs(() => blogs[currentPage - 1]);
  }

  useEffect(
    function () {
      async function fetchBlogs() {
        try {
          setIsLoading(true);
          const res = await fetch(baseUrl);
          const data = await res.json();

          let postContainers = [];
          let PostsInOnePage = [];
          for (let i = 0, blogCount = 1; i < data.length; i++, blogCount++) {
            PostsInOnePage.push(data[i]);
            if (blogCount % blogPostsPerPage === 0) {
              postContainers.push([...PostsInOnePage]);
              PostsInOnePage = [];
            }
          }

          setBlogs(postContainers);
          setVisibleBlogs(
            postContainers.length > 0 ? postContainers[currentPage - 1] : []
          );
        } catch (err) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
      fetchBlogs();
    },
    [currentPage]
  );

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
        visibleBlogs.map((blog) => {
          return (
            <BlogCard
              title={blog.title}
              description={blog.content}
              key={blog.title}
            />
          );
        })}
      {!isError && blogs.length > 0 && (
        <BlogPagination
          currentPage={currentPage}
          updateCurrentPage={handleUpdateCurrentPage}
          maxPageCount={blogs.length}
        />
      )}
      {!isError && blogs.length === 0 && (
        <Card>
          <Title>Blogs Coming Soon</Title>
          <Description>
            There are currently no blogs yet. Stay tuned as I will be adding
            blog posts here in the future.
          </Description>
        </Card>
      )}
    </div>
  );
}

export default Blog;
