const injectLetterBefore = (
  str: string,
  word: string,
  letter: string
): string => {
  const spliceIndex = str.indexOf(word);
  return str.slice(0, spliceIndex) + letter + str.slice(spliceIndex);
};

export { injectLetterBefore };
