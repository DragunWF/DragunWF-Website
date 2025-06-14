import styles from "./ApologyPage.module.css";
import Card from "../components/Card";
import Title from "../components/Title";
import Image from "../components/Image";

function ApologyPage() {
  return (
    <div className={styles.wrapper}>
      {/* Yes, the max width. It may not be a blog, but a bigger card is preferred */}
      <Card maxWidthType="blog">
        <Title>Page Not Found!</Title>
        <Image src="/page-not-found.webp" />
      </Card>
    </div>
  );
}

export default ApologyPage;
