import styles from "./Blog.module.css";
import Card from "../components/Card";
import Description from "../components/Description";
import Title from "../components/Title";

function Blog() {
  return (
    <div className={styles.wrapper}>
      <Card>
        <Title>Coming Soon....</Title>
        <Description>Blog page is currently in development!</Description>
      </Card>
    </div>
  );
}

export default Blog;
