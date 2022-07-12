// Group an array of objects by an object key.
export default function groupBy(array, key) {
  return array.reduce((prevElement, currentElement) => {
    prevElement[currentElement[key]] = prevElement[currentElement[key]] || [];
    prevElement[currentElement[key]].push(currentElement);
    return prevElement;
  }, {});
}
