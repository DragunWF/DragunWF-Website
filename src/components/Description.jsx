import styles from "./Description.module.css";

function Description({ children, textAlign }) {
  let textAlignClass;
  switch (textAlign) {
    case "center":
      textAlignClass = styles.center;
      break;
    case "justify":
      textAlignClass = styles.justify;
      break;
    case "left":
      textAlignClass = styles.left;
      break;
    default:
      textAlignClass = styles.center;
      break;
  }

  return (
    <p className={`${styles.description} ${textAlignClass}`}>{children}</p>
  );
}

export default Description;
