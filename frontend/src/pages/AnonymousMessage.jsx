import { useState } from "react";

import styles from "./AnonymousMessage.module.css";
import Card from "../components/Card";
import Title from "../components/Title";
import Description from "../components/Description";
import { sendAnonymousMessageApiUrl } from "../helpers/links";
import Modal from "../components/Modal";

function AnonymousMessage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maxCharacterLength = 2500;
  const minCharacterLength = 15;

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    // Validation
    if (message.length < minCharacterLength) {
      setErrorMessage(
        `Message must be at least ${minCharacterLength} characters long.`
      );
      setSubmitStatus("error");
      return;
    }

    if (message.length > maxCharacterLength) {
      setErrorMessage(
        `Message cannot exceed ${maxCharacterLength} characters.`
      );
      setSubmitStatus("error");
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const response = await fetch(sendAnonymousMessageApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Note: For future use

      // Success
      setSubmitStatus("success");
      setMessage(""); // Clear the form
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      {isModalOpen && (
        <Modal
          title="Anonymous Message Sent!"
          description="Your message to DragunWF has been sent! He’ll be able to read it either through his email or on the admin dashboard. Thanks for dropping by, anonymous messages like yours help keep this little corner of the internet lively."
          imageSrc="/mail-received.webp"
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <Card>
        <Title>Anonymous Message Form</Title>
        <Description isMarginPresent={false}>
          Feel free to send me any message!
        </Description>
        <p className={styles.disclaimer}>
          Disclaimer: This is purely for entertainment purposes and not for
          business.
        </p>

        <form className={styles.messageForm} onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            placeholder="Enter any message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="8"
            maxLength={maxCharacterLength}
            required
            disabled={isLoading}
          />

          <div className={styles.characterLimitWrapper}>
            <span className={styles.characterLimitText}>
              {message.length}/{maxCharacterLength} Characters
            </span>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className={styles.successMessage}>
              Message sent successfully! 🎉
            </div>
          )}

          {submitStatus === "error" && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </Card>
    </div>
  );
}

export default AnonymousMessage;
