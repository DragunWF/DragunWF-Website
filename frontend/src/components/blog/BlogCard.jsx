import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import removeMd from "remove-markdown";

import styles from "./BlogCard.module.css";
import Card from "../ui/Card";
import Title from "../ui/Title";
import Description from "../ui/Description";
import Image from "../ui/Image";
import BlogButton from "./BlogButton";
import { formatDate } from "../../helpers/formatters";

function BlogCard({
  postId,
  title,
  image, // New Cloudinary image field
  imageLink, // Legacy image_link field (deprecated)
  description,
  dateCreated,
  dateUpdated,
}) {
  const rawDescription = removeMd(description);
  const maxCharacterDisplayCount = 250;

  /**
   * Get the image URL for the blog card with priority fallback
   * @returns {string|null} - The image URL or null if no image available
   */
  const getBlogImageUrl = () => {
    // Priority 1: Legacy image_link field (for backward compatibility)
    if (imageLink && imageLink.trim() !== "") {
      return imageLink;
    }

    // Priority 2: Cloudinary image field
    if (image) {
      // Handle Cloudinary field - now it should be a URL string from the serializer
      if (typeof image === "string" && image.trim() !== "") {
        return image;
      }
      // Fallback: check if it's still an object format (for safety)
      else if (typeof image === "object" && image.url) {
        return image.url;
      }
    }

    // No image available
    return null;
  };

  function trimDescription(fullDescription) {
    if (fullDescription <= maxCharacterDisplayCount) {
      return fullDescription;
    }
    return `${fullDescription.substring(0, maxCharacterDisplayCount)}...`;
  }

  return (
    <Card>
      <Title>{title}</Title>
      {getBlogImageUrl() && <Image src={getBlogImageUrl()} />}
      <Description textAlign="justify">
        {trimDescription(rawDescription)}
      </Description>
      <Link to={`${postId}`}>
        <BlogButton variant="blog" width="half">
          View Full Blog
        </BlogButton>
      </Link>
      <div className={styles.datesWrapper}>
        <span>Created: {formatDate(dateCreated)}</span>
        <span>Updated: {formatDate(dateUpdated)}</span>
      </div>
    </Card>
  );
}

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([
    PropTypes.string, // Direct URL string
    PropTypes.shape({
      // Cloudinary object
      url: PropTypes.string,
    }),
  ]),
  imageLink: PropTypes.string, // Legacy field (deprecated)
  description: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateUpdated: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default BlogCard;
