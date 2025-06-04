import { useState, useRef, useEffect } from "react";
import PassageArray from "../components/Passage_Array_3";

const SpellingPage = ({ renderWordWithSpan, setIsSpellingComplete }) => {
  const spellingPassage = PassageArray.find(
    (passage) => passage.type === "practice" && passage.exercise === "spelling"
  );

  const { audio_tags, vocabulary_wordlist, review_button } = spellingPassage || {};

  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // Track whether to show the "Next" button
  const audioRef = useRef(null);
  const checkButtonRef = useRef();
  const nextButtonRef = useRef(null);

    useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        if (showNextButton && nextButtonRef.current) {
          nextButtonRef.current.click();
        } else if (checkButtonRef.current) {
          checkButtonRef.current.click();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showNextButton]);

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
    if (audioRef.current) {
      audioRef.current.load();
    }
    setUserInput("");
    setFeedback("");
    setShowNextButton(false); // Reset the "Next" button visibility when the audio changes
  }, [currentAudioIndex]);

  const handleNextAudio = () => {
    if (currentAudioIndex < audio_tags.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
    }
  };

  const handlePreviousAudio = () => {
    if (currentAudioIndex > 0) {
      setCurrentAudioIndex(currentAudioIndex - 1);
    }
  };

  const checkAnswer = () => {
    const cleanText = (text) => text.trim().toLowerCase();

    if (!userInput.trim()) {
      setFeedback("Please try and spell the word you hear.");
      return;
    }

    const correctAnswer = cleanText(vocabulary_wordlist[currentAudioIndex]);
    const userAnswer = cleanText(userInput);

    if (userAnswer === correctAnswer) {
      setFeedback("Correct!");
      setShowNextButton(true); // Show the "Next" button when the answer is correct

      // If it's the last word, mark the spelling exercise as complete
      if (currentAudioIndex === audio_tags.length - 1) {
        setIsSpellingComplete(true); // Notify the parent component that the exercise is complete
      }
    } else {
      setFeedback(`Incorrect! The correct answer is "${vocabulary_wordlist[currentAudioIndex].trim()}".`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>{renderWordWithSpan("Practice Spelling")}</h2>

      {audio_tags && (
        <>
          <div>
            <audio controls ref={audioRef}>
              <source src={audio_tags[currentAudioIndex]} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <input
            type="text"
            placeholder="Type the word here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ width: "300px", marginTop: "20px" }}
          />
          <button
            ref={checkButtonRef}
            onClick={checkAnswer}
            style={{ marginLeft: "10px", marginTop: "20px" }}
          >
            {review_button || "Check Answer"}
          </button>
          {feedback && (
            <p style={{ marginTop: "10px", color: feedback === "Correct!" ? "green" : "red" }}>
              {feedback}
            </p>
          )}
          <div style={{ marginTop: "20px" }}>
            {/* Render "Previous" button only if the user can go back */}
            {currentAudioIndex > 0 && (
              <button
                onClick={handlePreviousAudio}
                style={{ marginRight: "10px" }}
              >
                Previous
              </button>
            )}
            {/* Render "Next" button only if the answer is correct and it's not the last word */}
            {showNextButton && currentAudioIndex < audio_tags.length - 1 && (
              <button ref={nextButtonRef} onClick={handleNextAudio}>Next</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SpellingPage;

/*
import { useState, useRef, useEffect } from "react";
import PassageArray from "../components/Passage_Array_3";

const SpellingPage = ({ renderWordWithSpan, setIsSpellingComplete }) => {
  const spellingPassage = PassageArray.find(
    (passage) => passage.type === "practice" && passage.exercise === "spelling"
  );

  const { audio_tags, vocabulary_wordlist, review_button } = spellingPassage || {};

  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // Track whether to show the "Next" button
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
    setUserInput("");
    setFeedback("");
    setShowNextButton(false); // Reset the "Next" button visibility when the audio changes
  }, [currentAudioIndex]);

  const handleNextAudio = () => {
    if (currentAudioIndex < audio_tags.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
    } else {
      // If it's the last word, mark the exercise as complete
      setIsSpellingComplete(true);
    }
  };

  const handlePreviousAudio = () => {
    if (currentAudioIndex > 0) {
      setCurrentAudioIndex(currentAudioIndex - 1);
    }
  };

  const checkAnswer = () => {
    const cleanText = (text) => text.trim().toLowerCase();

    if (!userInput.trim()) {
      setFeedback("Please try and spell the word you hear.");
      return;
    }

    const correctAnswer = cleanText(vocabulary_wordlist[currentAudioIndex]);
    const userAnswer = cleanText(userInput);

    if (userAnswer === correctAnswer) {
      setFeedback("Correct!");
      setShowNextButton(true); // Show the "Next" button when the answer is correct
    } else {
      setFeedback(`Incorrect! The correct answer is "${vocabulary_wordlist[currentAudioIndex].trim()}".`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>{renderWordWithSpan("Practice Spelling")}</h2>

      {audio_tags && (
        <>
          <div>
            <audio controls ref={audioRef}>
              <source src={audio_tags[currentAudioIndex]} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <input
            type="text"
            placeholder="Type the word here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ width: "300px", marginTop: "20px" }}
          />
          <button
            onClick={checkAnswer}
            style={{ marginLeft: "10px", marginTop: "20px" }}
          >
            {review_button || "Check Answer"}
          </button>
          {feedback && (
            <p style={{ marginTop: "10px", color: feedback === "Correct!" ? "green" : "red" }}>
              {feedback}
            </p>
          )}
          <div style={{ marginTop: "20px" }}>
          
            {currentAudioIndex > 0 && (
              <button
                onClick={handlePreviousAudio}
                style={{ marginRight: "10px" }}
              >
                Previous
              </button>
            )}
            
            {showNextButton && currentAudioIndex < audio_tags.length - 1 && (
              <button onClick={handleNextAudio}>Next</button>
            )}
          </div>
        </>
      )}

      
      {currentAudioIndex === audio_tags.length - 1 && feedback === "Correct!" && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setIsSpellingComplete(true)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default SpellingPage;
*/

/*
import { useState, useRef, useEffect } from "react";
import PassageArray from "../components/Passage_Array_3";

const SpellingPage = ({ renderWordWithSpan, setIsSpellingComplete }) => {
  const spellingPassage = PassageArray.find(
    (passage) => passage.type === "practice" && passage.exercise === "spelling"
  );

  const { audio_tags, vocabulary_wordlist, review_button } = spellingPassage || {};

  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // Track whether to show the "Next" button
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
    setUserInput("");
    setFeedback("");
    setShowNextButton(false); // Reset the "Next" button visibility when the audio changes
  }, [currentAudioIndex]);

  const handleNextAudio = () => {
    if (currentAudioIndex < audio_tags.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
    } else {
      // If it's the last word, mark the exercise as complete
      setIsSpellingComplete(true);
    }
  };

  const handlePreviousAudio = () => {
    if (currentAudioIndex > 0) {
      setCurrentAudioIndex(currentAudioIndex - 1);
    }
  };

  const checkAnswer = () => {
    const cleanText = (text) => text.trim().toLowerCase();

    if (!userInput.trim()) {
      setFeedback("Please try and spell the word you hear.");
      return;
    }

    const correctAnswer = cleanText(vocabulary_wordlist[currentAudioIndex]);
    const userAnswer = cleanText(userInput);

    if (userAnswer === correctAnswer) {
      setFeedback("Correct!");
      setShowNextButton(true); // Show the "Next" button when the answer is correct
    } else {
      setFeedback(`Incorrect! The correct answer is "${vocabulary_wordlist[currentAudioIndex].trim()}".`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>{renderWordWithSpan("Practice Spelling")}</h2>

      {audio_tags && (
        <>
          <div>
            <audio controls ref={audioRef}>
              <source src={audio_tags[currentAudioIndex]} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <input
            type="text"
            placeholder="Type the word here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ width: "300px", marginTop: "20px" }}
          />
          <button
            onClick={checkAnswer}
            style={{ marginLeft: "10px", marginTop: "20px" }}
          >
            {review_button || "Check Answer"}
          </button>
          {feedback && (
            <p style={{ marginTop: "10px", color: feedback === "Correct!" ? "green" : "red" }}>
              {feedback}
            </p>
          )}
          <div style={{ marginTop: "20px" }}>
            
            {currentAudioIndex > 0 && (
              <button
                onClick={handlePreviousAudio}
                style={{ marginRight: "10px" }}
              >
                Previous
              </button>
            )}
            
            {showNextButton && (
              <button onClick={handleNextAudio}>
                {currentAudioIndex === audio_tags.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SpellingPage;
*/