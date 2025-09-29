import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";

import styles from "./BlogPost.module.css";
import descriptionStyles from "../ui/Description.module.css";
import { blogPostApiUrl } from "../../constants/urls";
import { blogsKey } from "../../constants/localStorageKeys";
import { formatDate } from "../../helpers/formatters";
import useCache from "../../hooks/useCache";

import Card from "../ui/Card";
import Title from "../ui/Title";
import Loader from "../ui/Loader";
import Description from "../ui/Description";
import Image from "../ui/Image";
import BlogButton from "./BlogButton";

function BlogPost() {
  const { postId } = useParams();
  const [currentBlog, setCurrentBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const blogCache = useCache(blogsKey);

  useEffect(
    function () {
      function getBlogById(blogArray, id) {
        return blogArray.find((blog) => blog.id == id);
      }

      async function fetchBlogPost() {
        try {
          setIsLoading(true);
          setIsError(false);

          // First, try to get from cached blog list
          let blogArray = blogCache.get();

          if (!blogArray) {
            // Cache miss - fetch all blogs (we need all blogs to find the specific one)
            // Note: We could optimize this with a separate endpoint for individual posts
            const res = await fetch(`${blogPostApiUrl}?page_size=1000`); // Get all posts
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            const response = await res.json();
            blogArray = response.results || response; // Handle both paginated and non-paginated responses
            blogCache.set(blogArray);
          }

          // Find the specific blog post
          const foundBlog = getBlogById(blogArray, postId);

          if (!foundBlog) {
            throw new Error(`Blog post with ID '${postId}' was not found!`);
          }

          setCurrentBlog(foundBlog);
        } catch (err) {
          console.error(err);
          setIsError(true);

          // Fallback: try to use cached data even if expired
          const fallbackData = localStorage.getItem(blogsKey);
          if (fallbackData) {
            try {
              const parsed = JSON.parse(fallbackData);
              // Handle both old array format and new paginated format
              const blogArray = Array.isArray(parsed)
                ? parsed
                : parsed.results || [];
              const foundBlog = getBlogById(blogArray, postId);
              if (foundBlog) {
                setCurrentBlog(foundBlog);
                setIsError(false);
              }
            } catch (parseErr) {
              console.error("Failed to parse cached data:", parseErr);
            }
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchBlogPost();
    },
    [postId] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Show loader
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Loader />
      </div>
    );
  }

  // Show error
  if (isError) {
    return (
      <div className={styles.wrapper}>
        <Card>
          <Title>Something went wrong!</Title>
          <Description>
            An unexpected error occurred while trying to retrieve the blog post
            you requested. Please try refreshing the page or check back later.
          </Description>
          <Link to="../blog">
            <BlogButton variant="blogSecondary" width="half">
              Back
            </BlogButton>
          </Link>
        </Card>
      </div>
    );
  }

  // Show "not found" if no blog found
  if (!currentBlog) {
    return (
      <div className={styles.wrapper}>
        <Card>
          <Title>Blog Post Not Found</Title>
          <Description>
            The blog post you’re looking for doesn’t exist or may have been
            removed.
          </Description>
          <Link to="../blog">
            <BlogButton variant="blogOutline" width="half">
              Back to Blog
            </BlogButton>
          </Link>
        </Card>
      </div>
    );
  }

  // Show blog post content
  return (
    <div className={styles.wrapper}>
      <Card maxWidthType="blog">
        <Title>{currentBlog.title}</Title>
        {currentBlog.image_link && <Image src={currentBlog.image_link} />}
        <div className={styles.blogText}>
          <Markdown
            components={{
              p: ({ node, ...props }) => (
                <p className={descriptionStyles.justify} {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul style={{ marginBottom: "16px" }} {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol style={{ marginBottom: "16px" }} {...props} />
              ),
              li: ({ node, ...props }) => (
                <li
                  style={{ textAlign: "left", marginLeft: "20px" }}
                  {...props}
                />
              ),
            }}
          >
            {currentBlog.description}
          </Markdown>
        </div>
        <div className={styles.datesWrapper}>
          <span>Created: {formatDate(currentBlog.date_created)}</span>
          <span>Updated: {formatDate(currentBlog.date_updated)}</span>
        </div>
        <Link to="../blog">
          <BlogButton variant="blog" width="half">
            Back
          </BlogButton>
        </Link>
      </Card>
    </div>
  );
}

export default BlogPost;
