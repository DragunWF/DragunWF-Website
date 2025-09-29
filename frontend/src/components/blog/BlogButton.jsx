import PropTypes from "prop-types";
import Button from "../ui/Button";
import styles from "./BlogButton.module.css";

function BlogButton({
  children,
  variant = "blog",
  size = "medium",
  width = "auto",
  className = "",
  ...props
}) {
  const getBlogVariantClass = () => {
    switch (variant) {
      case "blogSecondary":
        return styles.blogSecondary;
      case "blogOutline":
        return styles.blogOutline;
      default:
        return styles.blog;
    }
  };

  const blogClassName = [getBlogVariantClass(), className]
    .filter(Boolean)
    .join(" ");

  return (
    <Button
      variant="primary"
      size={size}
      width={width}
      className={blogClassName}
      {...props}
    >
      {children}
    </Button>
  );
}

BlogButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["blog", "blogSecondary", "blogOutline"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  width: PropTypes.oneOf(["auto", "half", "full"]),
  className: PropTypes.string,
};

export default BlogButton;
