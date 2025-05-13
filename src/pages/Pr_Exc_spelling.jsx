import { useState, useRef, useEffect } from "react";
import PassageArray from "../components/Passage_Array_3";

const SpellingPage = ({ renderWordWithSpan }) => {
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
            {/* Render "Previous" button only if the user can go back */}
            {currentAudioIndex > 0 && (
              <button
                onClick={handlePreviousAudio}
                style={{ marginRight: "10px" }}
              >
                Previous
              </button>
            )}
            {/* Render "Next" button only if the answer is correct */}
            {showNextButton && currentAudioIndex < audio_tags.length - 1 && (
              <button onClick={handleNextAudio}>Next</button>
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

const SpellingPage = ({ renderWordWithSpan }) => {
  // Find the relevant passage with audio tags
  const spellingPassage = PassageArray.find(
    (passage) => passage.type === "practice" && passage.exercise === "spelling"
  );

  // Destructure the required properties
  const { audio_tags, vocabulary_wordlist, review_button } = spellingPassage || {};

  const [currentAudioIndex, setCurrentAudioIndex] = useState(0); // Track the current audio index
  const [userInput, setUserInput] = useState(""); // Track the user's input
  const [feedback, setFeedback] = useState(""); // Track feedback for the user
  const audioRef = useRef(null); // Reference to the audio element

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Reload the audio element when the source changes
    }
    setUserInput(""); // Clear the input field when the audio changes
    setFeedback(""); // Clear feedback when the audio changes
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
      // If the input is empty, set feedback to prompt the user to type something
      setFeedback("Please try and spell the word you hear.");
      return;
    }
  
    const correctAnswer = cleanText(vocabulary_wordlist[currentAudioIndex]);
    const userAnswer = cleanText(userInput);
  
    if (userAnswer === correctAnswer) {
      setFeedback("Correct!");
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
          {feedback && <p style={{ marginTop: "10px", color: feedback === "Correct!" ? "green" : "red" }}>{feedback}</p>}
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handlePreviousAudio}
              disabled={currentAudioIndex === 0}
              style={{ marginRight: "10px" }}
            >Previous
            </button>
            <button
              onClick={handleNextAudio}
              disabled={currentAudioIndex === audio_tags.length - 1}
            >Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SpellingPage;
*/
