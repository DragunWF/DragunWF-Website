import { useState } from "react";
import styles from "./Contact.module.css";
import Card from "../components/Card";
import Title from "../components/Title";
import Description from "../components/Description";

function Contact() {
  const [message, setMessage] = useState("");
  const maxCharacterLength = 2500;
  const minCharacterLength = 15;

  return (
    <div className={styles.wrapper}>
      <Card>
        <Title>Anonymous Message Form</Title>
        <Description isMarginPresent={false}>
          Feel free to send me any message!
        </Description>
        <p className={styles.disclaimer}>
          Disclaimer: This is purely for entertainment purposes and not for
          business.
        </p>
        <form
          className={styles.messageForm}
          action="https://formspree.io/f/xnnvdnwn"
          method="POST"
        >
          <textarea
            className={styles.textarea}
            placeholder="Enter any message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            rows="8"
            maxLength={maxCharacterLength}
            minLength={minCharacterLength}
            required
          ></textarea>
          <div className={styles.characterLimitWrapper}>
            <span className={styles.characterLimitText}>
              {message.length}/{maxCharacterLength} Characters
            </span>
          </div>

          <button className={styles.submitButton} type="submit">
            Send Message
          </button>
        </form>
      </Card>
    </div>
  );
}

export default Contact;
