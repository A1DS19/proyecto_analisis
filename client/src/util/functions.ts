export const capitalizeWord = (word: string) => {
  const firstLetter = word.charAt(0).toUpperCase();
  return firstLetter + word.slice(1);
};

export const capitalizeWords = (sentence: string) => {
  const words = sentence.split(' ');
  let transformedSentence = '';

  for (const i in words) {
    const firstLetter = words[i].charAt(0).toUpperCase();
    const word = firstLetter + words[i].slice(1) + ' ';
    transformedSentence += word;
  }

  return transformedSentence;
};
