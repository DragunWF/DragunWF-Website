import { useState } from "react";

import styles from "./AnonymousMessage.module.css";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import Description from "../components/ui/Description";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

import { sendAnonymousMessageApiUrl } from "../constants/urls";
import { isOnMessageCooldown } from "../constants/localStorageKeys";
import useCache from "../hooks/useCache";

function AnonymousMessage() {
  const maxCharacterLength = 2500;
  const minCharacterLength = 15;

  // Sets the number of minutes before the user can send a message again. It helps prevent spam.
  const messageCooldownMinutes = 3;
  const isOnMessageCooldownCache = useCache(
    isOnMessageCooldown,
    messageCooldownMinutes / 60
  );

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    const isOnCooldown = isOnMessageCooldownCache.get();
    if (isOnCooldown) {
      setErrorMessage(
        `Cooldown! You can send a message again in ${messageCooldownMinutes} minutes.`
      );
      setSubmitStatus("error");
      return;
    }

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
      isOnMessageCooldownCache.set(true);
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
          description={`Your message to DragunWF has been sent! He’ll be able to read it either through his email or on his admin dashboard. Thanks for dropping by, anonymous messages like yours help keep this little corner of the internet lively. You can send another message after a short ${messageCooldownMinutes}-minute cooldown.`}
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

          <Button
            type="submit"
            disabled={isLoading}
            width="half"
            className={styles.submitButton}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AnonymousMessage;

//aikjsld gasufrygwqolefugwquofegwqugef