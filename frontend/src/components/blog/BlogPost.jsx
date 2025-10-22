import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from "./BlogPost.module.css";
import markdownStyles from "./BlogMarkdown.module.css";
import descriptionStyles from "../ui/Description.module.css";
import { blogPostApiUrl } from "../../constants/urls";
import { blogsKey } from "../../constants/localStorageKeys";
import { formatDate } from "../../helpers/formatters";

import Card from "../ui/Card";
import Title from "../ui/Title";
import Loader from "../ui/Loader";
import Description from "../ui/Description";
import Image from "../ui/Image";
import BlogButton from "./BlogButton";

function BlogPost() {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const [currentBlog, setCurrentBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Get the page parameter to preserve it when going back
  const page = searchParams.get("page") || "1";
  const backUrl = `../blog?page=${page}`;

  /**
   * Get the image URL for the blog post with priority fallback
   * @param {Object} blog - The blog post object
   * @returns {string|null} - The image URL or null if no image available
   */
  const getBlogImageUrl = (blog) => {
    // Priority 1: Legacy image_link field (for backward compatibility)
    if (blog.image_link && blog.image_link.trim() !== "") {
      return blog.image_link;
    }

    // Priority 2: Cloudinary image field
    if (blog.image) {
      // Handle Cloudinary field - now it should be a URL string from the serializer
      if (typeof blog.image === "string" && blog.image.trim() !== "") {
        return blog.image;
      }
      // Fallback: check if it's still an object format (for safety)
      else if (typeof blog.image === "object" && blog.image.url) {
        return blog.image.url;
      }
    }

    // No image available
    return null;
  };

  useEffect(
    function () {
      /**
       * Find a blog post by ID from cached data across all pages
       * @param {number} id - The blog post ID to find
       * @returns {Object|null} - The found blog post or null
       */
      function findBlogInCache(id) {
        // Check all cached pages for the blog post
        const cacheKeys = Object.keys(localStorage).filter((key) =>
          key.startsWith(blogsKey)
        );

        for (const key of cacheKeys) {
          try {
            const cached = localStorage.getItem(key);
            if (!cached) continue;

            const parsed = JSON.parse(cached);
            const data = parsed.data || parsed;
            const results = data.results || data;

            if (Array.isArray(results)) {
              const found = results.find((blog) => blog.id == id);
              if (found) return found;
            }
          } catch (err) {
            console.error(`Error parsing cache key ${key}:`, err);
          }
        }

        return null;
      }

      async function loadBlogPost() {
        try {
          setIsLoading(true);
          setIsError(false);

          /**
           * PERFORMANCE OPTIMIZATION:
           * The full blog post data (including complete description) is already
           * cached when users view the blog list. No need to make an API call!
           * We simply retrieve it from the cache.
           */
          const foundBlog = findBlogInCache(postId);

          if (!foundBlog) {
            // Blog not found in any cached page
            try {
              const response = await fetch(`${blogPostApiUrl}/${postId}`);
              if (!response.ok) throw new Error("Network response was not ok");
              const fetchedBlogData = await response.json();
              console.log("Fetched blog data from API:", fetchedBlogData);
              setCurrentBlog(fetchedBlogData);
            } catch (err) {
              setIsError(true);
              console.warn(
                `Blog post with ID '${postId}' has not been found in cache or via API.`,
                err
              );
            }
          } else {
            setCurrentBlog(foundBlog);
          }
        } catch (err) {
          console.error("Error loading blog post:", err);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }

      loadBlogPost();
    },
    [postId, blogsKey] // eslint-disable-line react-hooks/exhaustive-deps
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
          <Link to={backUrl}>
            <BlogButton variant="blogSecondary" width="half">
              Back
            </BlogButton>
          </Link>
        </Card>
      </div>
    );
  }

  // Show "not found" if no blog found in cache
  if (!currentBlog && !isLoading) {
    return (
      <div className={styles.wrapper}>
        <Card>
          <Title>Blog Post Not Found</Title>
          <Description>
            This blog post hasn&apos;t been loaded yet. Please visit the blog
            list first to load the posts, then navigate back here.
          </Description>
          <Link to={backUrl}>
            <BlogButton variant="blogOutline" width="half">
              Go to Blog List
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
        {getBlogImageUrl(currentBlog) && (
          <Image src={getBlogImageUrl(currentBlog)} />
        )}
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
        <Link to={backUrl}>
          <BlogButton variant="blog" width="half">
            Back
          </BlogButton>
        </Link>
      </Card>
    </div>
  );
}

export default BlogPost;
