import PropTypes from "prop-types";
import styles from "./BlogCard.module.css";
import Card from "./Card";
import Title from "./Title";
import Description from "./Description";

function BlogCard({ title, description }) {
  const maxCharacterDisplayCount = 200;

  function trimDescription(description) {
    if (description <= maxCharacterDisplayCount) {
      return description;
    }
    return `${description.substring(0, maxCharacterDisplayCount)}...`;
  }

  return (
    <Card>
      <Title>{title}</Title>
      <Description textAlign="justify">
        {trimDescription(description)}
      </Description>
      <button className={styles.viewBlogButton}>View Full Blog</button>
      <div className={styles.datesWrapper}>
        <span>Created: May 15, 2025</span>
        <span>Updated: June 6, 2025</span>
      </div>
    </Card>
  );
}

BlogCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default BlogCard;
