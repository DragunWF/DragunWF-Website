import styles from "./About.module.css";
import { socialLinks } from "../helpers/linkUtils";
import Card from "../components/Card";
import Description from "../components/Description";
import Title from "../components/Title";

function About() {
  return (
    <div className={styles.wrapper}>
      <Card>
        <Title>Hobbies & Interests</Title>
        <Description textAlign="justify">
          Hallo! I’ve been programming since my Junior High School days,
          initially drawn to game development, the spark that first ignited my
          interest in code. Over time, I gradually expanded my skills into web
          and mobile development, backend systems, and automation tools like
          Discord bots and utility programs. You can explore many of these
          projects on my{" "}
          <a href={socialLinks.github} rel="noreferrer" target="_blank">
            GitHub profile
          </a>
          .
        </Description>
        <Description textAlign="justify">
          Beyond coding, I’m an avid reader with a particular fondness for books
          on self-improvement, productivity, and software craftsmanship. Works
          like <i>Atomic Habits</i>, <i>Deep Work</i>, and{" "}
          <i>The Pragmatic Programmer</i> have profoundly shaped my mindset and
          daily practices. I also maintain a personal journal, where I reflect
          on new concepts, insights from books, and lessons from everyday
          experiences.
        </Description>
      </Card>

      <Card>
        <Title>Hackathons</Title>
        <Description textAlign="justify">
          I have a deep appreciation for hackathons and game jams — fast-paced
          environments that challenge creativity, problem-solving, and teamwork
          under pressure. Every event feels like an exhilarating adventure,
          filled with unforgettable moments and new connections.
        </Description>
        <Description textAlign="justify">
          Over the years, I’ve competed in numerous hackathons and national
          competitions. One highlight was the{" "}
          <i>Tagisan ng Talino 2025: Codefest National Level</i>, an annual
          mobile development competition hosted by STI College. To reach the
          national stage, teams must first become champions at both the local
          and cluster levels, a challenge I was fortunate to achieve, earning
          the chance to travel and compete across the country.
        </Description>
        <Description textAlign="justify">
          These experiences have taken me to various places and introduced me to
          brilliant minds along the way. You can discover more about the other
          hackathons I’ve joined on my{" "}
          <a href={socialLinks.linkedin} rel="noreferrer" target="_blank">
            LinkedIn profile
          </a>
          .
        </Description>
      </Card>

      <Card>
        <Title>Passion for Learning</Title>
        <Description textAlign="justify">
          I like to think of learning as a way of leveling up, much like in
          video games, where the character I’m developing is myself. While
          software development is my primary craft, I also enjoy exploring other
          fields such as public speaking, mathematics, communication, reading,
          and writing.
        </Description>
        <Description textAlign="justify">
          Each task or responsibility in my daily routine feels like a quest
          objective, offering the chance to improve a skill or attribute.
          Hackathons and events, to me, are like cooperative dungeon raids,
          challenging yet rewarding experiences that grant valuable knowledge
          and personal growth.
        </Description>
        <Description textAlign="justify">
          Even everyday items like my keyboard, clothes, or bags feel like
          in-game equipment, each with its own unique value and story. Whether
          earned through effort, gifted, or chosen with care, they’re part of my
          ongoing adventure toward continuous self-improvement.
        </Description>
      </Card>

      <span className={styles.bottomSpacing}></span>
    </div>
  );
}

export default About;
