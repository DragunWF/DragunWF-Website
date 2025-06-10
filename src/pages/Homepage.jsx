import styles from "./Homepage.module.css";
import Card from "../components/Card";

function Homepage() {
  return (
    <div className={styles.wrapper}>
      <Card
        name="Marc Plarisan"
        description="I’m an incoming 4th-year IT student specializing in mobile development for both iOS and Android, as well as backend development. Furthermore, I also have experience in web development and game development, allowing me to build versatile and engaging digital solutions across multiple platforms."
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
