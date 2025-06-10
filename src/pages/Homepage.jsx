import styles from "./Homepage.module.css";
import Card from "../components/Card";

function Homepage() {
  return (
    <div className={styles.wrapper}>
      <Card
        name="Marc Plarisan"
        description="Greetings, I'm an aspiring software developer, avid reader of books, daily journal writer"
        socialLinks={{
          github: "https://github.com/DragunWF",
          linkedin: "https://linkedin.com/in/marcplarisan",
          twitter: "https://twitter.com/dragunwf",
          email: "dragunwf@example.com",
        }}
      />
    </div>
  );
}

export default Homepage;
