import styles from "./Title.module.css";

function Title({ children }) {
  return <h2 className={styles.title}>{children}</h2>;
}

export default Title;
