// An array of emoticons used to evaluate different wellness states.
const WELLNESS_MAPPING = ["😫", "🙁", "😐", "😃", "🤩"];

// Takes a number between 0-4 as a string and returns an emoji.
export default function WellnessEmoji({ value }) {
  if (value >= 0 && value < WELLNESS_MAPPING.length) {
    return (
      <span aria-label={value} role="img">
        {WELLNESS_MAPPING[value]}
      </span>
    );
  }
  return <></>;
}

export { WellnessEmoji, WELLNESS_MAPPING };
