import { useState, useEffect } from "react";
import { blogPostApiUrl } from "../helpers/linkUtils";

import styles from "./Blog.module.css";
import Card from "../components/Card";
import Title from "../components/Title";
import Description from "../components/Description";
import BlogCard from "../components/BlogCard";
import BlogPagination from "../components/BlogPagination";
import Loader from "../components/Loader";

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
          setIsError(false);

          const res = await fetch(blogPostApiUrl);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();

          let postPageChunks = [];
          let postsInOnePage = [];
          for (let i = 0, blogCount = 1; i < data.length; i++, blogCount++) {
            postsInOnePage.push(data[i]);
            if (blogCount % blogPostsPerPage === 0) {
              postPageChunks.push([...postsInOnePage]);
              postsInOnePage = [];
            }
          }
          if (postsInOnePage.length > 0) {
            postPageChunks.push([...postsInOnePage]);
          }

          setBlogs(postPageChunks);
          setVisibleBlogs(
            postPageChunks.length > 0 ? postPageChunks[currentPage - 1] : []
          );
        } catch (err) {
          console.error(err);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
      fetchBlogs();
    },
    [currentPage]
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
      <BlogPagination
        currentPage={currentPage}
        updateCurrentPage={handleUpdateCurrentPage}
        maxPageCount={blogs.length}
      />
    </div>
  );
}

export default Blog;
