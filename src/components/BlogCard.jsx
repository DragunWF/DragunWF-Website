import PropTypes from "prop-types";
import removeMd from "remove-markdown";
import styles from "./BlogCard.module.css";
import Card from "./Card";
import Title from "./Title";
import Description from "./Description";
import { Link } from "react-router-dom";

function BlogCard({ title, description, dateCreated, dateUpdated, postId }) {
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
      <Description textAlign="justify">
        {trimDescription(rawDescription)}
      </Description>
      <Link to={`${postId}`}>
        <button className={styles.viewBlogButton}>View Full Blog</button>
      </Link>
      <div className={styles.datesWrapper}>
        <span>Created: {dateCreated}</span>
        <span>Updated: {dateUpdated}</span>
      </div>
    </Card>
  );
}

BlogCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  dateCreated: PropTypes.string,
  dateUpdated: PropTypes.string,
  postId: PropTypes.number,
};

export default BlogCard;
