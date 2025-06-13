import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";

import styles from "./BlogPost.module.css";
import { blogPostApiUrl } from "../helpers/links";
import { formatDate } from "../helpers/formatters";
import Card from "./Card";
import Title from "./Title";
import Loader from "./Loader";
import Description from "./Description";
import Image from "./Image";

function BlogPost() {
  const { postId } = useParams();
  const [currentBlog, setCurrentBlog] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    function () {
      async function fetchBlogPost() {
        try {
          setIsLoading(true);
          setIsError(false); // Reset error state when starting new request

          const res = await fetch(`${blogPostApiUrl}/${postId}`);

          // Check if the response is ok (status 200-299)
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          setCurrentBlog(data);
        } catch (err) {
          console.error(err);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
      fetchBlogPost();
    },
    [postId]
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
            <button className={styles.backButton}>Back</button>
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
                <p style={{ textAlign: "justify" }} {...props} />
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
          <button className={styles.backButton}>Back</button>
        </Link>
      </Card>
    </div>
  );
}

export default BlogPost;
