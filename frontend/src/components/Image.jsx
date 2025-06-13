import PropTypes from "prop-types";
import styles from "./Image.module.css";

function Image({ src }) {
  const pathNodes = src.split("/");
  let altName =
    pathNodes.length > 0 ? pathNodes[pathNodes.length - 1] : "Image";
  return <img className={styles.dynamicImg} src={src} alt={altName}></img>;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;
