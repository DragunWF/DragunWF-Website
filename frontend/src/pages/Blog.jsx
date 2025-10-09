import { useState, useEffect } from "react";
import { blogPostApiUrl } from "../constants/urls";
import { blogsKey } from "../constants/localStorageKeys";
import useCache from "../hooks/useCache";

import styles from "./Blog.module.css";
import BlogCard from "../components/blog/BlogCard";
import BlogPagination from "../components/blog/BlogPagination";

import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import Description from "../components/ui/Description";
import Loader from "../components/ui/Loader";

/**
 * Blog List Page Component
 *
 * Displays paginated blog posts with support for both Cloudinary images
 * and legacy image links. Uses intelligent caching for performance.
 *
 * Image Priority:
 * 1. Legacy image_link field (for backward compatibility)
 * 2. Cloudinary image field (new preferred method)
 */

function Blog() {
  const blogPostsPerPage = 4;

  const [blogs, setBlogs] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    has_next: false,
    has_previous: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  function handleUpdateCurrentPage(pageCount) {
    setCurrentPage(pageCount);
  }

  /**
   * Helper function to clear blog cache (useful for debugging Cloudinary image issues)
   * Can be called from browser console: window.clearBlogCache()
   */
  const clearBlogCache = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith(blogsKey)
    );
    keys.forEach((key) => localStorage.removeItem(key));
    console.log(`Cleared ${keys.length} blog cache entries`);
  };

  // Make clearBlogCache available globally for debugging
  if (typeof window !== "undefined") {
    window.clearBlogCache = clearBlogCache;
  }

  useEffect(
    function () {
      async function fetchBlogs() {
        try {
          setIsLoading(true);
          setIsError(false);

          // Create cache key with page number
          const cacheKey = `${blogsKey}_page_${currentPage}`;

          // Try to get data from cache first
          let cachedData = localStorage.getItem(cacheKey);
          let data = null;

          if (cachedData) {
            try {
              const parsed = JSON.parse(cachedData);
              const cacheAge = Date.now() - parsed.timestamp;
              // Use cache if less than 30 minutes old
              if (cacheAge < 30 * 60 * 1000) {
                data = parsed.data;
              }
            } catch (parseErr) {
              console.error("Failed to parse cached data:", parseErr);
            }
          }

          if (!data) {
            // Cache miss or expired - fetch fresh data
            const url = `${blogPostApiUrl}?page=${currentPage}&page_size=${blogPostsPerPage}`;
            const res = await fetch(url);

            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }

            data = await res.json();

            // Store in cache with timestamp
            localStorage.setItem(
              cacheKey,
              JSON.stringify({
                data: data,
                timestamp: Date.now(),
              })
            );

            // Debug: Log the API response to check image field format
            console.log("Fresh API data for debugging:", data);
          } else {
            // Debug: Log cached data to check image field format
            console.log("Cached data for debugging:", data);
          }

          setBlogs(data.results || []);
          setPaginationInfo(
            data.pagination || {
              current_page: 1,
              total_pages: 1,
              total_count: 0,
              has_next: false,
              has_previous: false,
            }
          );
        } catch (err) {
          console.error(err);
          setIsError(true);

          // Fallback: try to use any cached data for this page
          const cacheKey = `${blogsKey}_page_${currentPage}`;
          const fallbackData = localStorage.getItem(cacheKey);
          if (fallbackData) {
            try {
              const parsed = JSON.parse(fallbackData);
              const data = parsed.data;

              setBlogs(data.results || []);
              setPaginationInfo(
                data.pagination || {
                  current_page: currentPage,
                  total_pages: 1,
                  total_count: 0,
                  has_next: false,
                  has_previous: false,
                }
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
    [currentPage, blogPostsPerPage] // eslint-disable-line react-hooks/exhaustive-deps
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
          <Title>Blog Portal Jammed!</Title>
          <Description>
            A playful spirit tangled the blog scrolls. Try refreshing, or return
            when the magic is restored.
          </Description>
        </Card>
      </div>
    );
  }

  if (blogs.length === 0 && !isLoading && !isError) {
    return (
      <div className={styles.wrapper}>
        <Card>
          <Title>A Magical Mist Obscures the Blogs</Title>
          <Description>
            The blog scrolls are currently hidden by a mysterious force. Please
            try again later!
          </Description>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.blogsContainer}>
        {blogs.map((blog) => {
          return (
            <BlogCard
              title={blog.title}
              image={blog.image} // New Cloudinary image field
              imageLink={blog.image_link ? blog.image_link : ""} // Legacy image_link field
              description={blog.description}
              dateCreated={blog.date_created}
              dateUpdated={blog.date_updated}
              postId={blog.id}
              key={blog.id}
            />
          );
        })}
      </div>
      {paginationInfo.total_pages > 1 && (
        <BlogPagination
          currentPage={paginationInfo.current_page}
          updateCurrentPage={handleUpdateCurrentPage}
          maxPageCount={paginationInfo.total_pages}
          hasNext={paginationInfo.has_next}
          hasPrevious={paginationInfo.has_previous}
        />
      )}
    </div>
  );
}

export default Blog;
