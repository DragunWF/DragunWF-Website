import styles from "./Homepage.module.css";
import IntroCard from "../components/IntroCard";

function Homepage() {
  return (
    <div className={styles.wrapper}>
      <IntroCard
        name="DragunWF"
        description="Hi, I'm Marc Plarisan. I am a software developer who builds websites, mobile apps, and video games. When I'm not coding, you'll find me lost in a good book or jotting down my thoughts in my journal, balancing personal growth with technical curiosity."
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
