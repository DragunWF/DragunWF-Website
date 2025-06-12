import PropTypes from "prop-types";
import styles from "./Card.module.css";

function Card({ children }) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
