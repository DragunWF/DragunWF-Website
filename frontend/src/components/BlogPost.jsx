import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";

import styles from "./BlogPost.module.css";
import Card from "./Card";
import Title from "./Title";
import { blogPostApiUrl } from "../helpers/linkUtils";
import Loader from "./Loader";
import Description from "./Description";

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

          const res = await fetch(`${blogPostApiUrl}/${postId}`);
          const data = await res.json();
          console.log(data);

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

  return (
    <div className={styles.wrapper}>
      {isLoading && !isError ? (
        <Loader />
      ) : (
        <Card>
          <Title>{currentBlog.title}</Title>
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
          <Link to="../blog">
            <button className={styles.backButton}>Back</button>
          </Link>
        </Card>
      )}
      {isError && (
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
      )}
    </div>
  );
}

export default BlogPost;
