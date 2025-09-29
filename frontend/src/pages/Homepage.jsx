import styles from "./Homepage.module.css";
import IntroCard from "../components/home/IntroCard";

function Homepage() {
  return (
    <div className={styles.wrapper}>
      <IntroCard
        name="DragunWF"
        description="Hi, I'm Marc Plarisan. I am a software developer who builds websites, mobile apps, and video games. When I'm not coding, you'll find me lost in a good book or jotting down my thoughts in my journal, balancing personal growth with technical curiosity."
      />
    </div>
  );
}

export default Homepage;
