import PropTypes from "prop-types";
import styles from "./Image.module.css";

function Image({ src }) {
  const pathNodes = src.split("/");
  const altName = pathNodes[pathNodes.length - 1];
  return <img className={styles.dynamicImg} src={src} alt={altName}></img>;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;
