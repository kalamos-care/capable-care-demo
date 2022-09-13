import { DataWrapper } from "./DataWrapper";

class Appointment extends DataWrapper {
  get date() {
    return new Date(this.start).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  }

  get time() {
    const formatting = { hour: "2-digit", minute: "2-digit", hour12: false };
    const startTime = new Date(this.start).toLocaleTimeString("en-US", formatting);
    const endTime = new Date(this.end).toLocaleTimeString("en-US", formatting);
    return `${startTime} - ${endTime}`;
  }
}

export default Appointment;
