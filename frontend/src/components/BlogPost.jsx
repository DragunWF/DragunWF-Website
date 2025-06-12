import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./BlogPost.module.css";
import Card from "./Card";
import Title from "./Title";
import Markdown from "react-markdown";

const currentBlog = {
  id: 1,
  title: "The Future of Remote Work",
  content:
    "Remote work has fundamentally changed how we approach **productivity** and *collaboration*. Companies are discovering that flexible work arrangements can lead to:\n\n- Increased employee satisfaction\n- Better work-life balance\n- Reduced overhead costs\n\n\nMany organizations are now implementing `hybrid models` that combine the best of both worlds. Employees can enjoy the comfort of working from home while still maintaining face-to-face connections with their colleagues.\n\n> The key to successful remote work lies in establishing clear communication channels and maintaining regular check-ins.\n\nTools like video conferencing, project management software, and instant messaging platforms have become **essential** for keeping teams connected. As we move forward, it's clear that remote work isn't just a temporary solution—it's a permanent shift in how we think about the workplace.",
  dateCreated: "March 15, 2024",
  dateUpdated: "April 2, 2024",
};

function BlogPost() {
  const { postId } = useParams();

  return (
    <div className={styles.wrapper}>
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
            {currentBlog.content}
          </Markdown>
        </div>
        <Link to="../blog">
          <button className={styles.backButton}>Back</button>
        </Link>
      </Card>
    </div>
  );
}

export default BlogPost;
