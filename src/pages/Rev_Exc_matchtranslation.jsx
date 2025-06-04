import { useState, useEffect, useMemo } from "react";
import PassageArray from "../components/Passage_Array_3";

const MatchingTranslationReviewPage = ({ setShowNextButton }) => {
  const translations = useMemo(
    () =>
      PassageArray.filter((passage) => passage.translations)
        .map((passage) => passage.translations),
    []
  );

  const vocabularyWordlist = useMemo(
    () =>
      PassageArray.find((passage) => passage.vocabulary_wordlist)
        ?.vocabulary_wordlist.map((word) => word.replace(/^\d+\.\s*/, "").trim()),
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [options, setOptions] = useState([]);

  // Generate options only when currentIndex changes
  useEffect(() => {
    const correctAnswer = vocabularyWordlist[currentIndex];
    const shuffledOptions = [...vocabularyWordlist]
      .filter((word) => word !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setOptions(
      [correctAnswer, ...shuffledOptions].sort(() => Math.random() - 0.5)
    );
    setSelectedAnswer(null);
    setFeedback("");
  }, [currentIndex]); // Only depend on currentIndex

  useEffect(() => {
    setShowNextButton(false);
    return () => setShowNextButton(true);
  }, [setShowNextButton]);

  const handleNext = () => {
    if (currentIndex < translations.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // options, selectedAnswer, feedback will reset in useEffect above
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const correctAnswer = vocabularyWordlist[currentIndex];
    if (answer === correctAnswer) {
      setFeedback("Correct!");
      if (currentIndex === translations.length - 1) {
        setShowNextButton(true);
      }
    } else {
      setFeedback("Try again!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p>Review Exercise 1</p>
      <div style={{ margin: "20px", fontSize: "1.5rem" }}>
        {translations[currentIndex]}
      </div>
      <div>
        {options.map((option, index) => {
          const cleanOption = option.replace(/_/g, " ");
          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              style={{
                margin: "5px",
                padding: "10px 20px",
                backgroundColor: selectedAnswer === option ? "#000" : "",
                color: selectedAnswer === option ? "#fff" : "",
              }}
              disabled={feedback === "Correct!"}
            >
              {cleanOption}
            </button>
          );
        })}
      </div>
      <div style={{ margin: "10px", fontSize: "1.2rem" }}>
        {feedback === "Correct!" && (
          <span style={{ color: "green" }}>{feedback}</span>
        )}
        {feedback === "Try again!" && (
          <span style={{ color: "red" }}>{feedback}</span>
        )}
      </div>
      <div>
        {feedback === "Correct!" && currentIndex < translations.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
};

export default MatchingTranslationReviewPage;

/*
import { useState, useEffect } from "react";
import PassageArray from "../components/Passage_Array_3";

const MatchingTranslationReviewPage = ({ setShowNextButton }) => {
  const translations = PassageArray.filter((passage) => passage.translations)
    .map((passage) => passage.translations);

  const vocabularyWordlist = PassageArray.find(
    (passage) => passage.vocabulary_wordlist
  )?.vocabulary_wordlist.map((word) => word.replace(/^\d+\.\s--/, "").trim());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Hide the "Next" button when the component is mounted
    setShowNextButton(false);

    // Show the "Next" button when unmounted (cleanup)
    return () => setShowNextButton(true);
  }, [setShowNextButton]);

  const handleNext = () => {
    if (currentIndex < translations.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setFeedback("");
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const correctAnswer = vocabularyWordlist[currentIndex];
    if (answer === correctAnswer) {
      setFeedback("Correct!");

      // Show the "Next" button if it's the last word in the array
      if (currentIndex === translations.length - 1) {
        setShowNextButton(true);
      }
    } else {
      setFeedback("Try again!");
    }
  };


  const generateOptions = () => {
    const correctAnswer = vocabularyWordlist[currentIndex];
    const shuffledOptions = [...vocabularyWordlist]
      .filter((word) => word !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [correctAnswer, ...shuffledOptions].sort(() => Math.random() - 0.5);
  };

  const options = generateOptions();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p>Review Exercise 1</p>
      <div style={{ margin: "20px", fontSize: "1.5rem" }}>
        {translations[currentIndex]}
      </div>
      <div>
        {options.map((option, index) => {
          const cleanOption = option.replace(/_/g, " "); // Replace underscores with spaces
        return (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            style={{
              margin: "5px",
              padding: "10px 20px",
              backgroundColor: selectedAnswer === option ? "#000" : "",
              color: selectedAnswer === option ? "#fff" : "",
            }}
          >
            {cleanOption}
          </button>
        );
        })}
      </div>
      <div style={{ margin: "10px", fontSize: "1.2rem" }}>
        {feedback === "Correct!" && (
          <span style={{ color: "green" }}>{feedback}</span>
        )}
        {feedback === "Try again!" && (
          <span style={{ color: "red" }}>{feedback}</span>
        )}
      </div>
      <div>
        {feedback === "Correct!" && currentIndex < translations.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
};

export default MatchingTranslationReviewPage;
*/
