import { useState, useEffect } from "react";
import { blogPostApiUrl } from "../helpers/links";
import { blogsKey } from "../helpers/localStorageKeys";
import { getBlogPostPageChunks } from "../helpers/utils";
import useCache from "../helpers/useCache";

import styles from "./Blog.module.css";
import Card from "../components/Card";
import Title from "../components/Title";
import Description from "../components/Description";
import BlogCard from "../components/BlogCard";
import BlogPagination from "../components/BlogPagination";
import Loader from "../components/Loader";

function Blog() {
  const blogPostsPerPage = 3;

  // Initialize the cache hook
  const blogCache = useCache(blogsKey); // 6 hours expiration

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
          setIsError(false);

          // Try to get data from cache first
          let data = blogCache.get();

          if (!data) {
            // Cache miss or expired - fetch fresh data
            const res = await fetch(blogPostApiUrl);
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }

            data = await res.json();

            // Store in cache
            blogCache.set(data);
          }

          // Split blogs data for pagination
          const postPageChunks = getBlogPostPageChunks(data, blogPostsPerPage);

          setBlogs(postPageChunks);
          setVisibleBlogs(
            postPageChunks.length > 0 ? postPageChunks[currentPage - 1] : []
          );
        } catch (err) {
          console.error(err);
          setIsError(true);

          // Fallback: try to use cached data even if expired or fetch failed
          const fallbackData = localStorage.getItem(blogsKey);
          if (fallbackData) {
            try {
              const data = JSON.parse(fallbackData);

              // Split blogs data for pagination (same logic as above)
              const postPageChunks = getBlogPostPageChunks(
                data,
                blogPostsPerPage
              );

              setBlogs(postPageChunks);
              setVisibleBlogs(
                postPageChunks.length > 0 ? postPageChunks[currentPage - 1] : []
              );

              // Clear error state since we have fallback data
              setIsError(false);
            } catch (parseErr) {
              console.error("Failed to parse cached data:", parseErr);
            }
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchBlogs();
    },
    [currentPage] // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.wrapper}>
        <Card>
          <Title>Something went wrong!</Title>
          <Description>
            An unexpected error occurred while retrieving the blog data. Please
            try again later.
          </Description>
        </Card>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className={styles.wrapper}>
        <Card>
          <Title>Blogs Coming Soon</Title>
          <Description>
            There are currently no blogs yet. Stay tuned as I will be adding
            blog posts here in the future.
          </Description>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.blogsContainer}>
        {visibleBlogs.map((blog) => {
          return (
            <BlogCard
              title={blog.title}
              imageLink={blog.image_link ? blog.image_link : ""}
              description={blog.description}
              dateCreated={blog.date_created}
              dateUpdated={blog.date_updated}
              postId={blog.id}
              key={blog.id}
            />
          );
        })}
      </div>
      <BlogPagination
        currentPage={currentPage}
        updateCurrentPage={handleUpdateCurrentPage}
        maxPageCount={blogs.length}
      />
    </div>
  );
}

export default Blog;
