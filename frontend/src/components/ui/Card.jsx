import PropTypes from "prop-types";
import styles from "./Card.module.css";

function Card({ children, maxWidthType = "normal", animationType = "normal" }) {
  const maxWidthClasses = {
    normal: styles.maxWidthNormal,
    blog: styles.maxWidthBlog,
    modal: styles.maxWidthModal,
  };
  const animationTypeClasses = {
    normal: styles.animationNormal,
    fullOpacity: styles.animationFullOpacity,
  };

  const maxWidthClass =
    maxWidthType in maxWidthClasses
      ? maxWidthClasses[maxWidthType]
      : styles.maxWidthNormal;
  const animationClass =
    animationType in animationTypeClasses
      ? animationTypeClasses[animationType]
      : styles.animationNormal;

  return (
    <div className={`${styles.card} ${maxWidthClass} ${animationClass}`}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  maxWidthType: PropTypes.string,
  animationType: PropTypes.string,
};

export default Card;
