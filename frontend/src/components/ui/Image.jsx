import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Image.module.css";

function Image({ src, fallbackSrc = "/image-not-found.png", alt }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Extract alt text from src if not provided
  const pathNodes = src.split("/");
  const defaultAltName =
    pathNodes.length > 0 ? pathNodes[pathNodes.length - 1] : "Image";
  const altText = alt || defaultAltName;

  const handleImageError = () => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  const handleImageLoad = () => {
    // Reset error state when image loads successfully
    setHasError(false);
  };

  return (
    <img
      className={`${styles.dynamicImg} ${hasError ? styles.fallbackImg : ""}`}
      src={currentSrc}
      alt={altText}
      onError={handleImageError}
      onLoad={handleImageLoad}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
