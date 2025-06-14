import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import Card from "./Card";
import Title from "./Title";
import Description from "./Description";
import Image from "./Image";

function Modal({ onClose, title, description, imageSrc }) {
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleCloseClick() {
    onClose();
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <Card maxWidthType="modal" animationType="fullOpacity">
        <Title>{title}</Title>
        {imageSrc && <Image src={imageSrc} />}
        <Description textAlign="justify">{description}</Description>
        <button className={styles.closeButton} onClick={handleCloseClick}>
          Close
        </button>
      </Card>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};

export default Modal;
