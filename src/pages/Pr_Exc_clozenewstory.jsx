import React, { useState, useEffect } from "react";
import PassageArray from "../components/Passage_Array_3";
import FindMatchingWords from "../utils/FindMatchingWords";

const Practice_Ex_clozenewstory = ({
  renderWordWithSpan,
  setShowNextButton, // Receive the callback
}) => {
  // Find the relevant passage with new_story_text
  const newStoryPassage = PassageArray.find(
    (passage) => passage.type === "practice" && passage.exercise === "cloze_new_story"
  );

  // Destructure the required properties
  const { new_story_text, vocabulary_wordlist, review_button } = newStoryPassage || {};

  const [userSelections, setUserSelections] = useState({});
  const [allCorrect, setAllCorrect] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const cleanText = (text) => text.replace(/[^a-zA-Z]/g, "").toLowerCase().trim();

  const matchingWords = FindMatchingWords(new_story_text, vocabulary_wordlist);

  useEffect(() => {
    // Hide the "Next" button when the component is mounted
    setShowNextButton(false);

    // Cleanup: Show the "Next" button when the component is unmounted
    return () => setShowNextButton(true);
  }, [setShowNextButton]);

  const checkAnswers = () => {
    const allAnswered = Object.keys(userSelections).length === vocabulary_wordlist.length;
    setAllQuestionsAnswered(allAnswered);

    const results = Object.entries(userSelections).map(([key, userAnswer]) => {
      const [sentenceIndex, wordIndex] = key.split("-").map(Number);
      const originalWord = cleanText(
        new_story_text[sentenceIndex].split(" ")[wordIndex]
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
    <div className="story_text_div">
      <h2 style={{ textAlign: "center" }}>Practice Exercise: Cloze New Story</h2>
      {new_story_text &&
        new_story_text.map((story, index) => (
          <p key={index}>
            {story.split(" ").map((word, wordIndex) => {
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
                      {vocabulary_wordlist.map((vocabWord, vocabIndex) => {
                        const cleanVocabWord = vocabWord.replace(/^\d+\.\s*/, "").trim();
                        return (
                          <option key={vocabIndex} value={cleanVocabWord}>
                            {cleanVocabWord}
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
        <button onClick={checkAnswers} className="check_answers_button">
          {review_button || "Check Answers"}
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

export default Practice_Ex_clozenewstory;
/*
import React, { useState } from "react";
import PassageArray from "../components/Passage_Array";
import FindMatchingWords from "../utils/FindMatchingWords";

const Practice_Ex_clozenewstory = ({ renderWordWithSpan }) => {
  // Find the relevant passage with new_story_text
  const newStoryPassage = PassageArray.find(
    (passage) => passage.type === "practice" && passage.exercise === "cloze_new_story"
  );

  // Destructure the required properties
  const { new_story_text, vocabulary_wordlist, review_button } = newStoryPassage || {};

  const [userSelections, setUserSelections] = useState({});
  const [allCorrect, setAllCorrect] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const cleanText = (text) => text.replace(/[^a-zA-Z]/g, "").toLowerCase().trim();

  const matchingWords = FindMatchingWords(new_story_text, vocabulary_wordlist);

  const checkAnswers = () => {
    const allAnswered = Object.keys(userSelections).length === vocabulary_wordlist.length;
    setAllQuestionsAnswered(allAnswered);

    const results = Object.entries(userSelections).map(([key, userAnswer]) => {
      const [sentenceIndex, wordIndex] = key.split("-").map(Number);
      const originalWord = cleanText(
        new_story_text[sentenceIndex].split(" ")[wordIndex]
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
    <div className="story_text_div" style={{ textAlign: "center" }}>
      <h2>Practice Exercise 3</h2>
      {new_story_text && new_story_text.map((story, index) => (
        <p key={index}>
          {story.split(" ").map((word, wordIndex) => {
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
                    {vocabulary_wordlist.map((vocabWord, vocabIndex) => {
                      const cleanVocabWord = vocabWord.replace(/^\d+\.\s/, "").trim();
                      return (
                        <option key={vocabIndex} value={cleanVocabWord}>
                          {cleanVocabWord}
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
          {review_button || "Check Answers"}
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

export default Practice_Ex_clozenewstory;
*/
/*
import React, { useState } from "react";
import FindMatchingWords from "../utils/FindMatchingWords";

const Review_Ex_clozefromstory = ({ newStoryText, vocabularyWordlist, renderWordWithSpan, reviewButtonText }) => {
  const [userSelections, setUserSelections] = useState({});
  const [allCorrect, setAllCorrect] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const cleanText = (text) => text.replace(/[^a-zA-Z]/g, "").toLowerCase().trim();

  // Use the refactored FindMatchingWords function
  const matchingWords = FindMatchingWords(newStoryText, vocabularyWordlist);

  const checkAnswers = () => {

    const allAnswered =
      Object.keys(userSelections).length === vocabularyWordlist.length;
      setAllQuestionsAnswered(allAnswered);

    const results = Object.entries(userSelections).map(([key, userAnswer]) => {
      const [sentenceIndex, wordIndex] = key.split("-").map(Number);
      const originalWord = cleanText(
        newStoryText[sentenceIndex].split(" ")[wordIndex]
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
    <div className="story_text_div" style={{ textAlign: "center" }}>
      <p>Review Exercise 2</p>
      {newStoryText.map((story, index) => (
        <p key={index}>
          {story.split(" ").map((word, wordIndex) => {
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
                    defaultValue={""}
                    onChange={(e) => {
                      setUserSelections((prev) => ({
                        ...prev,
                        [`${index}-${wordIndex}`]: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Select</option>
                    {vocabularyWordlist.map((vocabWord, vocabIndex) => {
                      const cleanVocabWord = vocabWord.replace(/^\d+\.\s/, "").trim();
                      return (
                        <option key={vocabIndex} value={cleanVocabWord}>
                          {cleanVocabWord}
                        </option>
                      );
                    })}
                  </select>
                  {punctuation}{" "}
                </React.Fragment>
              );
            } else {
              // Wrap normal text with WordWithPopUp
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

export default Review_Ex_clozefromstory;
*/
