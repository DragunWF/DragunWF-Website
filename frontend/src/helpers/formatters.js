export function formatDate(dateString) {
  const date = new Date(dateString);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // reset to midnight

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // subtract 1 day

  const dateOnly = new Date(date);
  dateOnly.setHours(0, 0, 0, 0); // reset to midnight

  let formattedDate;
  if (dateOnly.getTime() === today.getTime()) {
    formattedDate = "Today";
  } else if (dateOnly.getTime() === yesterday.getTime()) {
    formattedDate = "Yesterday";
  } else {
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    formattedDate = date.toLocaleDateString("en-US", dateOptions);
  }

  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate} at ${formattedTime}`;
}
