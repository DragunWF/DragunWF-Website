import { useEffect, useState, useRef } from "react";
import styles from "./About.module.css";
import { socialLinks } from "../constants/urls";

import Card from "../components/ui/Card";
import Description from "../components/ui/Description";
import Title from "../components/ui/Title";
import Image from "../components/ui/Image";

function About() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  // Scroll progress tracking
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  // Intersection Observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = parseInt(entry.target.dataset.cardIndex);
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, cardIndex]));
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setCardRef = (index) => (el) => {
    cardRefs.current[index] = el;
  };

  return (
    <div className={styles.wrapper}>
      {/* Magical scroll progress indicator */}
      <div className={styles.scrollProgress}>
        <div
          className={styles.progressBar}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Subtle floating particles background */}
      <div className={styles.particlesBackground}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={styles.floatingParticle}
            style={{
              left: `${15 + i * 12}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + (i % 3) * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={setCardRef(0)}
        data-card-index="0"
        className={`${styles.cardContainer} ${
          visibleCards.has(0) ? styles.visible : ""
        }`}
      >
        <Card>
          <Title>Hobbies & Interests</Title>
          <Image src="/hobbies-and-interests.webp" />
          <Description textAlign="justify">
            Hello! I&apos;ve been programming since my Junior High School days,
            initially drawn to{" "}
            <span className={styles.highlight}>game development</span>, the
            spark that first ignited my interest in code. Over time, I gradually
            expanded my skills into web and mobile development, backend systems,
            and automation tools like Discord bots and utility programs. You can
            explore many of these projects on my{" "}
            <a
              href={socialLinks.github}
              rel="noreferrer"
              target="_blank"
              className={styles.magicalLink}
            >
              GitHub profile
            </a>{" "}
            and{" "}
            <a
              href={socialLinks.itchio}
              rel="noreferrer"
              target="_blank"
              className={styles.magicalLink}
            >
              Itch.io page
            </a>
            .
          </Description>
          <Description textAlign="justify">
            Beyond coding, I&apos;m an avid reader with a particular fondness
            for books on self-improvement, productivity, and software
            craftsmanship. Works like{" "}
            <i className={styles.bookTitle}>Atomic Habits</i>,{" "}
            <i className={styles.bookTitle}>Deep Work</i>, and{" "}
            <i className={styles.bookTitle}>The Pragmatic Programmer</i> have
            profoundly shaped my mindset and daily practices. I also maintain a
            personal journal, where I reflect on new concepts, insights from
            books, and lessons from everyday experiences.
          </Description>
        </Card>
      </div>

      <div
        ref={setCardRef(1)}
        data-card-index="1"
        className={`${styles.cardContainer} ${
          visibleCards.has(1) ? styles.visible : ""
        }`}
      >
        <Card>
          <Title>Hackathons</Title>
          <Image src="hackathon.webp" />
          <Description textAlign="justify">
            I have a deep appreciation for{" "}
            <span className={styles.highlight}>hackathons</span> and game jams,
            fast-paced environments that challenge creativity, problem-solving,
            and teamwork under pressure. Every event feels like an exhilarating
            adventure, filled with unforgettable moments and new connections.
          </Description>
          <Description textAlign="justify">
            Over the years, I&apos;ve competed in numerous hackathons and
            national competitions. One highlight was the{" "}
            <i>Tagisan ng Talino 2025: Codefest National Level</i>, an annual
            mobile development competition hosted by STI College. To reach the
            national stage, teams must first become champions of both the local
            and cluster level hackathons, a challenge I was fortunate to
            achieve, earning the chance to travel and compete across the
            country.
          </Description>
          <Description textAlign="justify">
            These experiences have taken me to various places and introduced me
            to brilliant minds along the way. You can discover more about the
            other hackathons I&apos;ve joined on my{" "}
            <a
              href={socialLinks.linkedin}
              rel="noreferrer"
              target="_blank"
              className={styles.magicalLink}
            >
              LinkedIn profile
            </a>
            .
          </Description>
        </Card>
      </div>

      <div
        ref={setCardRef(2)}
        data-card-index="2"
        className={`${styles.cardContainer} ${
          visibleCards.has(2) ? styles.visible : ""
        }`}
      >
        <Card>
          <Title>Passion for Learning</Title>
          <Image src="/book-reader.webp" />
          <Description textAlign="justify">
            I like to think of{" "}
            <span className={styles.highlight}>learning</span> as a way of
            leveling up, much like in video games, where the character I&apos;m
            developing is myself. While software development is my primary
            craft, I also enjoy exploring other fields such as public speaking,
            mathematics, communication, reading, and writing.
          </Description>
          <Description textAlign="justify">
            Each task or responsibility in my daily routine feels like a{" "}
            <span className={styles.highlight}>quest objective</span>, offering
            the chance to improve a skill or attribute. Hackathons and events,
            to me, are like cooperative dungeon raids, challenging yet rewarding
            experiences that grant valuable knowledge and personal growth.
          </Description>
          <Description textAlign="justify">
            Ever since reading <i className={styles.bookTitle}>Atomic Habits</i>
            , I&apos;ve treated each day as a chance to gain experience points.
            I read books, fill pages in my journal, tackle lessons from a Udemy
            course, and build software that challenges me. Every small action
            stacks, pushing me closer to those critical thresholds where real
            change happens. Hitting those moments feels like unlocking a new
            skill in my personal{" "}
            <span className={styles.highlight}>skill tree</span>. That&apos;s
            what keeps the fire alive, the thrill of becoming a little better, a
            little stronger, and a little wiser with every quest I take on
            towards continuous self-improvement.
          </Description>
        </Card>
      </div>

      <span className={styles.bottomSpacing}></span>
    </div>
  );
}

export default About;
