import styles from "./Description.module.css";

function Description({ children, textAlign, isMarginPresent = true }) {
  const marginClass = isMarginPresent ? styles.margin : styles.noMargin;
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

  return <p className={`${styles.description} ${marginClass}`}>{children}</p>;
}

export default Description;
