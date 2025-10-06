import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from "./BlogPost.module.css";
import markdownStyles from "./BlogMarkdown.module.css";
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
              // Paragraph with justified text alignment
              p: ({ node, ...props }) => (
                <p className={descriptionStyles.justify} {...props} />
              ),

              // External links with magical styling (opens in new tab)
              a: ({ node, href, children, ...props }) => (
                <a
                  href={href}
                  className={markdownStyles.markdownLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              ),

              // Code blocks with syntax highlighting
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                const language = match ? match[1] : "";

                /**
                 * Robust inline vs block code detection:
                 * - Inline code (single backticks): No className, should stay in text flow
                 * - Block code (triple backticks): Has className (e.g., "language-js")
                 *
                 * The inline prop from react-markdown isn't always reliable,
                 * so we also check for className presence which is a more reliable indicator.
                 */
                const isInline = inline !== false && !className;

                // Inline code - render as inline element
                if (isInline) {
                  return (
                    <code
                      className={markdownStyles.markdownInlineCode}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                // Multi-line code block with syntax highlighting
                return (
                  <div className={markdownStyles.markdownCodeBlock}>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={language}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: 0,
                        background: "transparent",
                        fontSize: "0.9rem",
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                );
              },

              // Blockquote styling
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className={markdownStyles.markdownBlockquote}
                  {...props}
                />
              ),

              // Headings (h1-h6)
              h1: ({ node, ...props }) => (
                <h1
                  className={markdownStyles.markdownHeading}
                  style={{ fontSize: "2rem", textAlign: "left" }}
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className={markdownStyles.markdownHeading}
                  style={{ fontSize: "1.75rem", textAlign: "left" }}
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className={markdownStyles.markdownHeading}
                  style={{ fontSize: "1.5rem", textAlign: "left" }}
                  {...props}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  className={markdownStyles.markdownHeading}
                  style={{ fontSize: "1.25rem", textAlign: "left" }}
                  {...props}
                />
              ),
              h5: ({ node, ...props }) => (
                <h5
                  className={markdownStyles.markdownHeading}
                  style={{ fontSize: "1.1rem" }}
                  {...props}
                />
              ),
              h6: ({ node, ...props }) => (
                <h6
                  className={markdownStyles.markdownHeading}
                  style={{ fontSize: "1rem", textAlign: "left" }}
                  {...props}
                />
              ),

              // Horizontal rule
              hr: ({ node, ...props }) => (
                <hr className={markdownStyles.markdownHr} {...props} />
              ),

              // Unordered lists
              ul: ({ node, ...props }) => (
                <ul style={{ marginBottom: "16px" }} {...props} />
              ),

              // Ordered lists
              ol: ({ node, ...props }) => (
                <ol style={{ marginBottom: "16px" }} {...props} />
              ),

              // List items
              li: ({ node, ...props }) => (
                <li
                  style={{ textAlign: "left", marginLeft: "20px" }}
                  {...props}
                />
              ),

              // Tables
              table: ({ node, ...props }) => (
                <table className={markdownStyles.markdownTable} {...props} />
              ),

              // Images
              img: ({ node, alt, ...props }) => (
                <img
                  className={markdownStyles.markdownImage}
                  alt={alt || "Blog image"}
                  loading="lazy"
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
