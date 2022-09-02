import { format } from "date-fns";

// An observation.observed_at is saved as a UTC DateTime.
// In this app, we only let the user select a date from the date input but no timestamp.
// This defaults the timestamp to midnight UTC on the selected date.
// We want to display this field as mm/dd/yyyy.
// Using Javascript's `toLocaleDateString('en-US')` for displaying the date would convert
// it from midnight to -4 hours (8pm the previous day), so the date would be a day behind.
// Instead this helper formats it how we want it displayed, with the correct date.

// Note: This forces the date format to US and if you need the date to display with the correct
// local timezone then the observation input should allow the correct timestamp to be set by the user.

// '2022-05-03T00:00:00.000Z' => '05/03/2022'
export const UtcDateToUsDateFormat = (dateTimeString) => {
  // '2022-05-03T00:00:00.000Z' => '2022-05-03'
  const date = new Date(dateTimeString).toISOString().split("T")[0];
  // '2022-05-03' => ['2022', '05', '03']
  const dateArray = date.split("-");

  const day = dateArray[2];
  const month = dateArray[1];
  const year = dateArray[0];

  return `${month}/${day}/${year}`;
};

export const getMessageTimestampLabel = (sent: any): string => {
  if (typeof sent != "number") {
    if (typeof sent == "object" || typeof sent === "string") {
      try {
        sent = Date.parse(sent);
      } catch (error) {
        return "unknown";
      }
    } else {
      return "unknown";
    }
  }
  const now = Date.now();
  const diff = now - sent;
  let timeLabel;
  if (diff < 60000) {
    timeLabel = `< 1 minute ago`;
  } else if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    timeLabel = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    timeLabel = `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const sentDate = new Date(sent);
    timeLabel = format(sentDate, "MMM d, yyyy h:mmaaa");
  }
  return timeLabel;
};
