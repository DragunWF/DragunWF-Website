import PropTypes from "prop-types";
import { socialLinks } from "../helpers/linkUtils";
import styles from "./IntroCard.module.css";
import Card from "./Card";
import Description from "./Description";
import Title from "./Title";

function IntroCard({
  name = "Default Name",
  description = "Default Description",
}) {
  const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const ItchioIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.106 2.41 2.436 2.41 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.106 2.41 2.436 2.41 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.106 2.41 2.436 2.41 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.106 2.41 2.436 2.41 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.106 2.41 2.436 2.41C22.78 8.43 24 7.283 24 5.98V4.95c-.02-.622-2.08-2.99-3.13-3.612-3.253-.425-5.696-.425-9.87 0-4.174-.425-6.617-.425-9.87 0zM6.115 11.638c-1.21 0-2.19.96-2.19 2.15v9.05c0 1.19.98 2.15 2.19 2.15h2.53c1.21 0 2.19-.96 2.19-2.15v-6.9h2.33v6.9c0 1.19.98 2.15 2.19 2.15h2.53c1.21 0 2.19-.96 2.19-2.15v-9.05c0-1.19-.98-2.15-2.19-2.15z" />
    </svg>
  );

  const TypeRacerIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H2zm0 2h20v10H2V7zm2 2v2h2V9H4zm3 0v2h2V9H7zm3 0v2h2V9h-2zm3 0v2h2V9h-2zm3 0v2h2V9h-2zm3 0v2h2V9h-2zM4 12v2h3v-2H4zm4 0v2h8v-2H8zm9 0v2h3v-2h-3z" />
      <path d="M12 15l2-1.5v3L12 15z" opacity="0.7" />
    </svg>
  );

  const CodeWarsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M.76 12.2l1.24.13c.31-2.18 1.23-3.88 2.74-5.11 1.51-1.23 3.37-1.84 5.58-1.84 1.98 0 3.61.49 4.9 1.47 1.29.98 2.09 2.32 2.41 4.02l1.26-.14c-.38-2.05-1.35-3.66-2.91-4.84C14.43 4.71 12.5 4.12 10.32 4.12c-2.54 0-4.65.72-6.35 2.17C2.27 7.74 1.32 9.78.76 12.2zM23.24 11.8l-1.24-.13c-.31 2.18-1.23 3.88-2.74 5.11-1.51 1.23-3.37 1.84-5.58 1.84-1.98 0-3.61-.49-4.9-1.47-1.29-.98-2.09-2.32-2.41-4.02L5.11 13.27c.38 2.05 1.35 3.66 2.91 4.84 1.55 1.18 3.48 1.77 5.76 1.77 2.54 0 4.65-.72 6.35-2.17 1.7-1.45 2.65-3.49 3.21-5.91z" />
      <path d="M12 8.5l-3 3h2v4h2v-4h2l-3-3z" opacity="0.8" />
    </svg>
  );

  const SteamIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.624 0 11.99-5.367 11.99-12C23.97 5.367 18.603.001 11.979.001zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.288.005-1.913-.258-.627-.733-1.108-1.364-1.368-.612-.25-1.254-.23-1.796.054l1.524.63c.956.394 1.406 1.5 1.01 2.456-.394.957-1.497 1.407-2.454 1.016z" />
      <path d="M19.098 9.086c0-1.666-1.353-3.02-3.02-3.02-1.665 0-3.019 1.354-3.019 3.02 0 1.665 1.354 3.019 3.019 3.019 1.667 0 3.02-1.354 3.02-3.019z" />
    </svg>
  );

  return (
    <Card>
      <Title>{name}</Title>
      <Description textAlign="center">{description}</Description>

      <div className={styles.socialLinks}>
        {socialLinks.github && (
          <a
            href={socialLinks.github}
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        )}

        {socialLinks.linkedin && (
          <a
            href={socialLinks.linkedin}
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        )}

        {socialLinks.itchio && (
          <a
            href={socialLinks.itchio}
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Itch.io"
          >
            <ItchioIcon />
          </a>
        )}

        {socialLinks.typeracer && (
          <a
            href={socialLinks.typeracer}
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TypeRacer"
          >
            <TypeRacerIcon />
          </a>
        )}

        {socialLinks.codewars && (
          <a
            href={socialLinks.codewars}
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CodeWars"
          >
            <CodeWarsIcon />
          </a>
        )}

        {socialLinks.steam && (
          <a
            href={socialLinks.steam}
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Steam"
          >
            <SteamIcon />
          </a>
        )}
      </div>
    </Card>
  );
}

IntroCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default IntroCard;
