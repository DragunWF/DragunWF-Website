import PropTypes from "prop-types";
import styles from "./Card.module.css";

function Card({ children, maxWidthType = "normal" }) {
  let maxWidthClass;
  switch (maxWidthType) {
    case "normal":
      maxWidthClass = styles.maxWidthNormal;
      break;
    case "blog":
      maxWidthClass = styles.maxWidthBlog;
      break;
    case "modal":
      maxWidthClass = styles.maxWidthModal;
      break;
    default:
      maxWidthClass = styles.maxWidthNormal;
      break;
  }

  return (
    <div className={`${styles.card} ${maxWidthClass}`}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  maxWidthType: PropTypes.string,
};

export default Card;
