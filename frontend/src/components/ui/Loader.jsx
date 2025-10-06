import styles from "./Loader.module.css";

/**
 * Magical Fantasy Spinning Loader Component
 *
 * A mystical loading indicator that clearly shows spinning motion while maintaining magical aesthetics:
 * - Primary spinning magical energy ring (obvious loader visual cue)
 * - Glowing magical core with pulsating effects
 * - Secondary spinning trails for enhanced visual feedback
 * - Twinkling starfield background for fantasy atmosphere
 *
 * Combines the clear visual indication of a traditional spinner with magical fantasy theming.
 */
function Loader() {
  return (
    <div className={styles.loader}>
      {/* Twinkling starfield background for magical atmosphere */}
      <span></span>
      {/* Magical energy core with pulsating glow and spinning trails */}
      <div></div>
    </div>
  );
}

export default Loader;
