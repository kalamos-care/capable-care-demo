export default function ThumbsEmoji({ value }) {
  if (value == "1") {
    return (
      <span aria-label={value} role="img">
        👍
      </span>
    );
  } else {
    return (
      <span aria-label={value} role="img">
        👎
      </span>
    );
  }
}
