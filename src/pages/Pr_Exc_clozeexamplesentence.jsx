import React, { useState, useEffect } from "react";
import FindMatchingWords from "../utils/FindMatchingWords";

const ClozeExampleSentence = ({
  exampleSentences,
  vocabularyWordlist,
  renderWordWithSpan,
  reviewButtonText,
  setShowNextButton, // Receive the callback
}) => {
  const [userSelections, setUserSelections] = useState({});
  const [allCorrect, setAllCorrect] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const cleanText = (text) => text.replace(/[^a-zA-Z]/g, "").toLowerCase().trim();

  const matchingWords = FindMatchingWords(exampleSentences, vocabularyWordlist);

  useEffect(() => {
    // Hide the "Next" button when the component is mounted
    setShowNextButton(false);

    // Cleanup: Show the "Next" button when the component is unmounted
    return () => setShowNextButton(true);
  }, [setShowNextButton]);

  const checkAnswers = () => {
    const allAnswered =
      Object.keys(userSelections).length === vocabularyWordlist.length;
    setAllQuestionsAnswered(allAnswered);

    const results = Object.entries(userSelections).map(([key, userAnswer]) => {
      const [sentenceIndex, wordIndex] = key.split("-").map(Number);
      const originalWord = cleanText(
        exampleSentences[sentenceIndex].split(" ")[wordIndex]
      );
      return {
        key,
        correct: originalWord === cleanText(userAnswer),
      };
    });

    results.forEach(({ key, correct }) => {
      const selectElement = document.querySelector(`[data-key="${key}"]`);
      if (selectElement) {
        selectElement.style.backgroundColor = correct
          ? "lightgreen"
          : "lightcoral";
      }
    });

    const allAnswersCorrect = results.every(({ correct }) => correct);
    setAllCorrect(allAnswered && allAnswersCorrect);

    // Show the "Next" button if all answers are correct and all questions are answered
    if (allAnswered && allAnswersCorrect) {
      setShowNextButton(true);
    }

    setShowFeedback(true);
  };

  return (
    <div className="cloze_example_sentence_div" style={{ textAlign: "center" }}>
      <p>Practice Exercise 1</p>
      {exampleSentences.map((sentence, index) => (
        <p key={index}>
          {sentence.split(" ").map((word, wordIndex) => {
            const match = word.match(/^([a-zA-Z]+)([.,!?]*)$/);
            const cleanedWord = match ? cleanText(match[1]) : cleanText(word);
            const punctuation = match ? match[2] : "";

            if (matchingWords.includes(cleanedWord)) {
              return (
                <React.Fragment key={`${index}-${wordIndex}`}>
                  <select
                    data-key={`${index}-${wordIndex}`}
                    className="fill-in-the-blank"
                    defaultValue={""}
                    onChange={(e) => {
                      setUserSelections((prev) => ({
                        ...prev,
                        [`${index}-${wordIndex}`]: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Select</option>
                    {vocabularyWordlist.map((option, optionIndex) => {
                      const cleanOption = option.replace(/_/g, " ");
                      return (
                        <option key={optionIndex} value={option}>
                          {cleanOption}
                        </option>
                      );
                    })}
                  </select>
                  {punctuation}{" "}
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={`${index}-${wordIndex}`}>
                  {renderWordWithSpan(word)}{" "}
                </React.Fragment>
              );
            }
          })}
        </p>
      ))}

      {!allCorrect && (
        <button onClick={checkAnswers} className="check-answers-button">
          {reviewButtonText || "Check Answers"}
        </button>
      )}
      {showFeedback && !allQuestionsAnswered && (
        <p style={{ color: "red" }}>Not all questions have been answered!</p>
      )}
      {showFeedback && allQuestionsAnswered && !allCorrect && (
        <p style={{ color: "orange" }}>Some answers are incorrect. Please try again!</p>
      )}
      {allCorrect && <p style={{ color: "green" }}>All answers are correct!</p>}
    </div>
  );
};

export default ClozeExampleSentence;
/*
import React, { useState } from "react";
import FindMatchingWords from "../utils/FindMatchingWords.jsx";
import WordWithPopUp from "../utils/WordWithPopUp";

const ClozeExampleSentence = ({ exampleSentences, vocabularyWordlist, renderWordWithSpan, reviewButtonText, storyText }) => {
  const [userSelections, setUserSelections] = useState({});
  const [allCorrect, setAllCorrect] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  const cleanText = (text) => text.replace(/[^a-zA-Z]/g, "").toLowerCase().trim();

  // Use the refactored FindMatchingWords function
  const matchingWords = FindMatchingWords(exampleSentences, vocabularyWordlist);

  const checkAnswers = () => {

    const allAnswered =
      Object.keys(userSelections).length === vocabularyWordlist.length;
      setAllQuestionsAnswered(allAnswered);

    const results = Object.entries(userSelections).map(([key, userAnswer]) => {
      const [sentenceIndex, wordIndex] = key.split("-").map(Number);
      const originalWord = cleanText(
        exampleSentences[sentenceIndex].split(" ")[wordIndex]
      );
      return {
        key,
        correct: originalWord === cleanText(userAnswer),
      };
    });

    results.forEach(({ key, correct }) => {
      const selectElement = document.querySelector(`[data-key="${key}"]`);
      if (selectElement) {
        selectElement.style.backgroundColor = correct
          ? "lightgreen"
          : "lightcoral";
      }
    });

    const allAnswersCorrect = results.every(({ correct }) => correct);
    setAllCorrect(allAnswered && allAnswersCorrect);

    setShowFeedback(true);
  };

  return (
    <div className="cloze_example_sentence_div" style={{ textAlign: "center" }}>
      <p>Practice Exercise 1</p>
      {exampleSentences.map((sentence, index) => (
        <p key={index}>
          {sentence.split(" ").map((word, wordIndex) => {
            // Separate punctuation from the word
            const match = word.match(/^([a-zA-Z]+)([.,!?]*)$/);
            const cleanedWord = match ? cleanText(match[1]) : cleanText(word); // Clean the word
            const punctuation = match ? match[2] : ""; // Extract punctuation

            // Check if the cleaned word is a match
            if (matchingWords.includes(cleanedWord)) {
              return (
                <React.Fragment key={`${index}-${wordIndex}`}>
                  <select
                    data-key={`${index}-${wordIndex}`}
                    className="fill-in-the-blank"
                    onChange={(e) => {
                      setUserSelections((prev) => ({
                        ...prev,
                        [`${index}-${wordIndex}`]: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Select</option>
                    {vocabularyWordlist.map((option, optionIndex) => {
                      // Remove numbers and leading/trailing whitespace
                      const cleanOption = option.replace(/^\d+\.\s/, "").trim();
                      return (
                        <option key={optionIndex} value={cleanOption}>
                          {cleanOption}
                        </option>
                      );
                    })}
                  </select>
                  {punctuation}{" "}
                </React.Fragment>
              );
            } else {
              // Return the word and punctuation as normal text
              return (
                <React.Fragment key={`${index}-${wordIndex}`}>
                {renderWordWithSpan(word)}
                {punctuation}{" "}
              </React.Fragment>
              );
            }
          })}
        </p>
      ))}

      {!allCorrect && (
      <button onClick={checkAnswers} className="check-answers-button">
        {reviewButtonText || "Check Answers"}
      </button>
      )}
      {showFeedback && !allQuestionsAnswered && (
        <p style={{ color: "red" }}>Not all questions have been answered!</p>
      )}
      {showFeedback && allQuestionsAnswered && !allCorrect && (
        <p style={{ color: "orange" }}>Some answers are incorrect. Please try again!</p>
      )}
      {allCorrect && <p style={{ color: "green" }}>All answers are correct!</p>}


    </div>
  );
};

export default ClozeExampleSentence;
*/
/*
import React, { useState } from "react";
import FindMatchingWords_examplesentences from "../utils/FindMatchingWords_examplesentences";

const ClozeExampleSentence = ({ exampleSentences, vocabularyWordlist }) => {
  const [userSelections, setUserSelections] = useState({});
  const cleanText = (text) =>
    text.replace(/[^a-zA-Z]/g, "").toLowerCase().trim();

  const matchingWords = FindMatchingWords_examplesentences(
    exampleSentences,
    vocabularyWordlist
  );

  return (
    <div className="cloze_example_sentence_div" style={{ textAlign: "center" }}>
      {exampleSentences.map((sentence, index) => (
        <p key={index}>
          {sentence.split(" ").map((word, wordIndex) => {
            // Separate punctuation from the word
            const match = word.match(/^([a-zA-Z]+)([.,!?]*)$/);
            const cleanedWord = match ? cleanText(match[1]) : cleanText(word); // Clean the word
            const punctuation = match ? match[2] : ""; // Extract punctuation

            // Check if the cleaned word is a match
            if (matchingWords.includes(cleanedWord)) {
              return (
                <React.Fragment key={`${index}-${wordIndex}`}>
                  <select
                    data-key={`${index}-${wordIndex}`}
                    className="fill-in-the-blank"
                    onChange={(e) => {
                      setUserSelections((prev) => ({
                        ...prev,
                        [`${index}-${wordIndex}`]: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Select</option>
                    {vocabularyWordlist.map((option, optionIndex) => {
                      // Remove numbers and leading/trailing whitespace
                      const cleanOption = option.replace(/^\d+\.\s/, "").trim();
                      return (
                        <option key={optionIndex} value={cleanOption}>
                          {cleanOption}
                        </option>
                      );
                    })}
                  </select>
                  {punctuation}{" "}
                </React.Fragment>
              );
            } else {
              // Return the word and punctuation as normal text
              return (
                <span key={`${index}-${wordIndex}`}>
                  {word}{" "}
                </span>
              );
            }
          })}
        </p>
      ))}
    </div>
  );
};

export default ClozeExampleSentence;





import React, { useState } from "react";
import FindMatchingWords_examplesentences from "../utils/FindMatchingWords_examplesentences";

const ClozeExampleSentence = ({ exampleSentences, vocabularyWordlist }) => {
  const [userSelections, setUserSelections] = useState({});
  const cleanText = (text) =>
    text.replace(/[^a-zA-Z]/g, "").toLowerCase().trim();

  const matchingWords = FindMatchingWords_examplesentences(
    exampleSentences,
    vocabularyWordlist
  );

  return (
    <div className="cloze_example_sentence_div" style={{ textAlign: "center" }}>
      {exampleSentences.map((sentence, index) => (
        <p key={index}>
          {sentence.split(" ").map((word, wordIndex) => {
            // Separate punctuation from the word
            const match = word.match(/^([a-zA-Z]+)([.,!?]*)$/);
            const cleanedWord = match ? cleanText(match[1]) : cleanText(word); // Clean the word
            const punctuation = match ? match[2] : ""; // Extract punctuation

            // Check if the cleaned word is a match
            if (matchingWords.includes(cleanedWord)) {
              return (
                <React.Fragment key={`${index}-${wordIndex}`}>
                  <select
                    data-key={`${index}-${wordIndex}`}
                    className="fill-in-the-blank"
                    onChange={(e) => {
                      setUserSelections((prev) => ({
                        ...prev,
                        [`${index}-${wordIndex}`]: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Select</option>
                    {vocabularyWordlist.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {punctuation}{" "}
                </React.Fragment>
              );
            } else {
              // Return the word and punctuation as normal text
              return (
                <span key={`${index}-${wordIndex}`}>
                  {word}{" "}
                </span>
              );
            }
          })}
        </p>
      ))}
    </div>
  );
};

export default ClozeExampleSentence;
*/