import styles from "./Homepage.module.css";
import Card from "../components/Card";

function Homepage() {
  return (
    <div className={styles.wrapper}>
      <Card
        name="DragunWF"
        description="Hi, I'm Marc. I develop websites, mobile apps, and video games."
        socialLinks={{
          github: "https://github.com/DragunWF",
          linkedin: "https://www.linkedin.com/in/marc-plarisan/",
          itchio: "https://dragunwf.itch.io",
          typeracer: "https://data.typeracer.com/pit/profile?user=dragunwf",
          codewars: "https://www.codewars.com/users/DragunWF",
          steam: "https://steamcommunity.com/id/dragunwf",
        }}
      />
    </div>
  );
}

export default Homepage;
