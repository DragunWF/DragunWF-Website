import styles from "./Contact.module.css";
import Card from "../components/Card";
import Title from "../components/Title";
import Description from "../components/Description";

function Contact() {
  function handleFormSubmission() {}

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
            name="message"
            rows="8"
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </Card>
    </div>
  );
}

export default Contact;
