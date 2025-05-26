const FindMatchingWords = (textArray, vocabularyWordlist) => {
  // Helper function to clean text
  const cleanText = (text) =>
    text.replace(/[^a-zA-Z\s]/g, "").toLowerCase().trim();

  // Clean and normalize the input text
  const normalizedText = cleanText(textArray.join(" ")); // Combine all sentences into a single string

  // Normalize the vocabulary wordlist for comparison
  const normalizedVocabulary = vocabularyWordlist
    .map(cleanText)
    .filter(Boolean); // Remove empty strings

  // Find matches
  const matches = normalizedVocabulary.filter((phrase) =>
    normalizedText.includes(phrase)
  );

  // Return unique matches
  return [...new Set(matches)];
};

export default FindMatchingWords;

/*
const FindMatchingWords = (textArray, vocabularyWordlist) => {
    // Helper function to clean text
    const cleanText = (text) =>
      text.replace(/[^a-zA-Z]/g, "").toLowerCase().trim();
  
    // Flatten the input text array into individual words
    const words = textArray
      .join(" ") // Combine all sentences into a single string
      .split(/\W+/) // Split into words using non-word characters as delimiters
      .map(cleanText) // Clean each word
      .filter(Boolean); // Remove empty strings
  
    // Normalize the vocabulary wordlist for comparison
    const normalizedVocabulary = vocabularyWordlist
      .map(cleanText)
      .filter(Boolean); // Remove empty strings
  
    // Find matches
    const matches = words.filter((word) => normalizedVocabulary.includes(word));
  
    // Return unique matches
    return [...new Set(matches)];
  };
  
  export default FindMatchingWords;

  */