export default function titlecase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.replace(w[0], w[0].toUpperCase()))
    .join(" ");
}
