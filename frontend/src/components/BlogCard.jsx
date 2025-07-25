import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import removeMd from "remove-markdown";

import styles from "./BlogCard.module.css";
import Card from "./Card";
import Title from "./Title";
import Description from "./Description";
import Image from "./Image";
import { formatDate } from "../helpers/formatters";

function BlogCard({
  postId,
  title,
  imageLink,
  description,
  dateCreated,
  dateUpdated,
}) {
  const rawDescription = removeMd(description);
  const maxCharacterDisplayCount = 250;

  function trimDescription(fullDescription) {
    if (fullDescription <= maxCharacterDisplayCount) {
      return fullDescription;
    }
    return `${fullDescription.substring(0, maxCharacterDisplayCount)}...`;
  }

  return (
    <Card>
      <Title>{title}</Title>
      {imageLink && <Image src={imageLink} />}
      <Description textAlign="justify">
        {trimDescription(rawDescription)}
      </Description>
      <Link to={`${postId}`}>
        <button className={styles.viewBlogButton}>View Full Blog</button>
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
  imageLink: PropTypes.string,
  description: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateUpdated: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default BlogCard;
