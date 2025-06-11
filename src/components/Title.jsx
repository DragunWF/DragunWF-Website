import PropTypes from "prop-types";
import styles from "./Title.module.css";

function Title({ children }) {
  return <h2 className={styles.title}>{children}</h2>;
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
