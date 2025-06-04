import React, { useState, useEffect, useRef } from "react";
import FindMatchingWords from "../utils/FindMatchingWords";
import PassageArray from "../components/Passage_Array_3";


const Review_Ex_clozefromstory = ({
  storyText,
  vocabularyWordlist,
  renderWordWithSpan,
  reviewButtonText,
  setShowNextButton,
  setCurrentIndex, // Receive the setCurrentIndex function
}) => {
  const [userSelections, setUserSelections] = useState({});
  const [allCorrect, setAllCorrect] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const checkButtonRef = useRef();
  const cleanText = (text) => text.replace(/[^a-zA-Z]/g, "").toLowerCase().trim();

  const matchingWords = FindMatchingWords(storyText, vocabularyWordlist);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          if (checkButtonRef.current) {
            checkButtonRef.current.click();
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

  useEffect(() => {
    // Hide the "Next" button when the component is mounted
    setShowNextButton(false);

    // Cleanup: Show the "Next" button when the component is unmounted
    return () => setShowNextButton(true);
  }, [setShowNextButton]);

const checkAnswers = () => {
  // Find all <select> elements with the class "fill-in-the-blank"
const allInputs = document.querySelectorAll(".fill-in-the-blank");

  // Check if all <select> elements have a value selected
  const allAnswered = Array.from(allInputs).every((input) => input.value.trim() !== "");

  setAllQuestionsAnswered(allAnswered);

  const results = Object.entries(userSelections).map(([key, userAnswer]) => {
    const [sentenceIndex, wordIndex] = key.split("-").map(Number);

    // Get the original word from the storyText
    const words = storyText[sentenceIndex].split(/(\s+)/); // Split by spaces but keep spaces as tokens
    const originalWord = cleanText(words[wordIndex]); // Use cleanText to process the word

    return {
      key,
      correct: originalWord === cleanText(userAnswer), // Compare cleaned versions
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

  const handleBack = () => {
    // Find the index of the exercise_selection page
    const exerciseSelectionIndex = PassageArray.findIndex(
      (passage) => passage.exercise_selection
    );
    if (exerciseSelectionIndex !== -1) {
      setCurrentIndex(exerciseSelectionIndex); // Navigate back to the exercise_selection page
    } else {
      console.log("Exercise selection page not found");
    }
  };

return (
  <div className="story_text_div">
  {storyText.map((story, index) => {
  const words = story.split(/(\s+)/); // Split by spaces but keep spaces as tokens
  return (
    <p key={index}>
      {words.map((word, wordIndex) => {
        // Separate word and punctuation
        const match = word.match(/^([a-zA-Z'-]+)([.,!?]*)$/);
        const baseWord = match ? match[1] : word;
        const punctuation = match ? match[2] : "";

        const cleanedWord = cleanText(baseWord);
        if (matchingWords.some((phrase) => cleanedWord === cleanText(phrase))) {
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
                  const cleanVocabWord = vocabWord.replace(/_/g, " ");
                  return (
                    <option key={vocabIndex} value={vocabWord}>
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
  );
})}


      {!allCorrect && (
        <div class="review_cloze_buttons_div">
        <button ref={checkButtonRef} onClick={checkAnswers} className="check_answers_button">
          {reviewButtonText || "Check Answers"}
        </button>
        </div>
      )}
      {showFeedback && !allQuestionsAnswered && (
        <p style={{ textAlign: "center" , color: "yellow" }}>Not all questions have been answered!</p>
      )}
      {showFeedback && allQuestionsAnswered && !allCorrect && (
        <p style={{ textAlign: "center" , color: "red" }}>Some answers are incorrect. Please try again!</p>
      )}
      {allCorrect && <p style={{ textAlign: "center" , color: "green" }}>All answers are correct!</p>}

      {/* Back Button */}
      <button onClick={handleBack} className="back_button">
        Back to Exercise Selection
      </button>
      </div>
  );
};

export default Review_Ex_clozefromstory;


/*
return (
  <div className="story_text_div" style={{ }}>
    {storyText.map((story, index) => {
      const words = story.split(/(\s+)/); // Split by spaces but keep spaces as tokens
      return (
        <p key={index}>
          {words.map((word, wordIndex) => {
            const cleanedWord = cleanText(word);
            if (matchingWords.some((phrase) => cleanedWord.includes(cleanText(phrase)))) {
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
                  const cleanVocabWord = vocabWord.replace(/_/g, " "); // Replace underscores with spaces
                  return (
                    <option key={vocabIndex} value={vocabWord}>
                    {cleanVocabWord}
                    </option>
                  );
                  })}
                  </select>
                  {" "}
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
      );
    })}
*/


/*
  return (
    <div className="story_text_div" style={{ textAlign: "center" }}>
      <p>Review Exercise 2</p>
      {storyText.map((story, index) => (
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
              return (
                <React.Fragment key={`${index}-${wordIndex}`}>
                  {renderWordWithSpan(word)}{" "}
                </React.Fragment>
              );
            }
          })}
        </p>
      ))}
      */

