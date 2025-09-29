import { useState } from "react";
import styles from "./AnimatedAvatar.module.css";

/**
 * AnimatedAvatar Component
 *
 * A green-themed animated avatar featuring a hooded mage head with glowing eyes.
 * The component includes multiple animations:
 * - Floating/hovering effect
 * - Glowing eyes animation
 * - Magical aura effects
 * - Floating star particles
 * - Interactive hover effects
 * - Click interaction that creates magical particle burst with randomized positions
 *
 * Simplified design focusing on just the head for cleaner appearance.
 * Supports multiple simultaneous particle bursts that don't interfere with each other.
 */
function AnimatedAvatar() {
  const [particleBursts, setParticleBursts] = useState([]);

  // Generate randomized particle positions around the perimeter
  const generateRandomBurst = () => {
    const particles = [];
    const numParticles = 8;

    for (let i = 0; i < numParticles; i++) {
      // Generate random positions around the perimeter
      const angle =
        (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.8;
      const radiusVariation = 0.8 + Math.random() * 0.4; // 80-120% of base radius

      // Convert polar to cartesian for starting positions on the perimeter
      const perimeterRadius = 45; // Radius to match the head's edge (50px head radius * 0.9)
      const startX = 50 + Math.cos(angle) * perimeterRadius; // Start at perimeter
      const startY = 50 + Math.sin(angle) * perimeterRadius;

      // Calculate burst direction with increased distance and randomness
      const burstDistance = 120 + Math.random() * 80; // 120-200px burst distance (much further)
      const burstX = Math.cos(angle) * burstDistance * radiusVariation;
      const burstY = Math.sin(angle) * burstDistance * radiusVariation;

      particles.push({
        id: Math.random().toString(36).substr(2, 9),
        startX: Math.max(5, Math.min(95, startX)), // Keep within bounds with more margin
        startY: Math.max(5, Math.min(95, startY)),
        burstX,
        burstY,
        delay: i * 0.05 + Math.random() * 0.1, // Randomized delay
        size: 4 + Math.random() * 4, // Random size 4-8px
      });
    }

    return particles;
  };

  const handleClick = () => {
    const newBurst = {
      id: Date.now(),
      particles: generateRandomBurst(),
      createdAt: Date.now(),
    };

    setParticleBursts((prev) => [...prev, newBurst]);

    // Remove this burst after animation completes
    setTimeout(() => {
      setParticleBursts((prev) =>
        prev.filter((burst) => burst.id !== newBurst.id)
      );
    }, 1200); // Slightly longer than animation duration
  };
  return (
    <div className={styles.avatarContainer}>
      {/* Cosmic aura background */}
      <div className={styles.cosmicAura}></div>

      {/* Main head */}
      <div className={styles.head} onClick={handleClick}>
        {/* Space hood/helmet */}
        <div className={styles.spaceHood}></div>

        {/* Face area */}
        <div className={styles.face}>
          {/* Glowing eyes */}
          <div className={styles.eyesContainer}>
            <div className={styles.eye}>
              <div className={styles.eyeGlow}></div>
            </div>
            <div className={styles.eye}>
              <div className={styles.eyeGlow}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating star particles */}
      <div className={styles.stars}>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
      </div>

      {/* Magical click particles - multiple bursts supported */}
      {particleBursts.map((burst) => (
        <div key={burst.id} className={styles.magicalBurst}>
          {burst.particles.map((particle, index) => (
            <div
              key={particle.id}
              className={styles.burstParticle}
              style={{
                top: `${particle.startY}%`,
                left: `${particle.startX}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                "--burst-x": `${particle.burstX}px`,
                "--burst-y": `${particle.burstY}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default AnimatedAvatar;
