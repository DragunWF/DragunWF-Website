import styles from "./Description.module.css";

function Description({ children }) {
  return <p className={styles.description}>{children}</p>;
}

export default Description;
