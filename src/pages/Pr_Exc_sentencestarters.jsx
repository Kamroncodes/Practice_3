import { useEffect } from "react";
import AITutor from "../utils/AITutor";


const SentenceStartersPage = () => {

  return (
    <div className="sentence_builder" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Practice Exercise: Sentence Starters</h2>

      

    </div>
  );
};

export default SentenceStartersPage;

/* pre AI Tutor version

import { useState, useEffect } from "react";
import PassageArray from "../components/Passage_Array_3";
import AITutor from "../utils/AITutor";

const SentenceStartersPage = ({ renderWordWithSpan, setShowNextButton }) => {
  // Find the relevant passage with sentence starters
  const sentenceStarterPassage = PassageArray.find(
    (passage) => passage.type === "practice" && passage.exercise === "sentence_builder"
  );

  // Destructure the required properties
  const { sentence_starters_word_1, sentence_starters_1, sentence_starters_word_2, sentence_starters_2 } = sentenceStarterPassage || {};

  const [currentPage, setCurrentPage] = useState(1); // Track the current page (1 for _1, 2 for _2)

  useEffect(() => {
    // Hide the "Next" button in NavButtons when the component is mounted
    setShowNextButton(false);

    // Cleanup: Show the "Next" button in NavButtons when the component is unmounted
    return () => setShowNextButton(true);
  }, [setShowNextButton]);

  useEffect(() => {
    // Show the "Next" button in NavButtons when the user reaches the last page
    if (currentPage === 2) {
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  }, [currentPage, setShowNextButton]);

  const handleNextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderSentenceWithInput = (sentence, index) => {
    const parts = sentence.split("BLANK");
    return (
      <div key={index} className="sentence-with-input">
        {renderWordWithSpan(parts[0])}
        <input type="text" className="sentence-input" />
        {renderWordWithSpan(parts[1])}
      </div>
    );
  };

  return (
    <div className="sentence_builder" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Practice Exercise: Sentence Starters</h2>

      <AITutor />
      {currentPage === 1 && (
        <>
          {sentence_starters_word_1 && <h3>{renderWordWithSpan(sentence_starters_word_1)}</h3>}
          {sentence_starters_1 && (
            <div>
              {sentence_starters_1.map((sentence, index) => renderSentenceWithInput(sentence, index))}
              <input type="text" style={{ width: "300px", marginTop: "20px" }} placeholder="Make your own sentence here..." />
            </div>
          )}
        </>
      )}

      {currentPage === 2 && (
        <>
          {sentence_starters_word_2 && <h3>{renderWordWithSpan(sentence_starters_word_2)}</h3>}
          {sentence_starters_2 && (
            <div>
              {sentence_starters_2.map((sentence, index) => renderSentenceWithInput(sentence, index))}
              <input type="text" style={{ width: "300px", marginTop: "20px" }} placeholder="Make your own sentence here..." />
            </div>
          )}
        </>
      )}

            <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        {currentPage < 2 && (
          <button onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SentenceStartersPage;
*/
/*
import React, { useState } from "react";
import PassageArray from "../components/Passage_Array";

const SentenceStartersPage = ({ renderWordWithSpan }) => {
  // Find the relevant passage with sentence starters
  const sentenceStarterPassage = PassageArray.find(
    (passage) => passage.type === "practice" && passage.exercise === "sentence_builder"
  );

  // Destructure the required properties
  const { sentence_starters_word_1, sentence_starters_1, sentence_starters_word_2, sentence_starters_2 } = sentenceStarterPassage || {};

  const [currentPage, setCurrentPage] = useState(1); // Track the current page (1 for _1, 2 for _2)
  const [userInputs, setUserInputs] = useState({});

  const handleInputChange = (index, value) => {
    setUserInputs((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const renderSentenceWithInput = (sentence, index) => {
    const parts = sentence.split("BLANK");
    return (
      <div key={index} className="sentence-with-input">
        {renderWordWithSpan(parts[0])}
        <input
          type="text"
          value={userInputs[index] || ""}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="sentence-input"
        />
        {renderWordWithSpan(parts[1])}
      </div>
    );
  };

  const handleNextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="sentence_builder" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Practice Exercise 2</h2>

      {currentPage === 1 && (
        <>
          {sentence_starters_word_1 && <h3>{renderWordWithSpan(sentence_starters_word_1)}</h3>}
          {sentence_starters_1 && (
            <div>
              {sentence_starters_1.map((sentence, index) => renderSentenceWithInput(sentence, index))}
              <input type="text" style={{ width: "300px", marginTop: "20px" }} placeholder="Make your own sentence here..." />
            </div>
          )}
        </>
      )}

      {currentPage === 2 && (
        <>
          {sentence_starters_word_2 && <h3>{renderWordWithSpan(sentence_starters_word_2)}</h3>}
          {sentence_starters_2 && (
            <div>
              {sentence_starters_2.map((sentence, index) => renderSentenceWithInput(sentence, index))}
              <input type="text" style={{ width: "300px", marginTop: "20px" }} placeholder="Make your own sentence here..." />
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === 2}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SentenceStartersPage;




import React, { useState } from "react";
import PassageArray from "../components/Passage_Array";

const SentenceStartersPage = () => {
  // Find the relevant passage with sentence starters
  const sentenceStarterPassage = PassageArray.find(
    (passage) => passage.type === "practice" && passage.exercise_type === "sentence_builder"
  );

  // Destructure the required properties
  const { sentence_starters_word_1, sentence_starters_1, sentence_starters_word_2, sentence_starters_2 } = sentenceStarterPassage || {};

  const [currentPage, setCurrentPage] = useState(1); // Track the current page (1 for _1, 2 for _2)
  const [userInputs, setUserInputs] = useState({});

  const handleInputChange = (index, value) => {
    setUserInputs((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const renderSentenceWithInput = (sentence, index) => {
    const parts = sentence.split("BLANK");
    return (
      <div key={index} className="sentence-with-input">
        {parts[0]}
        <input
          type="text"
          value={userInputs[index] || ""}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="sentence-input"
        />
        {parts[1]}
      </div>
    );
  };

  const handleNextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="sentence_builder" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Finish these sentences!</h2>

      {currentPage === 1 && (
        <>
          {sentence_starters_word_1 && <h3>{sentence_starters_word_1}</h3>}
          {sentence_starters_1 && (
            <div>
              {sentence_starters_1.map((sentence, index) => renderSentenceWithInput(sentence, index))}
              <input type="text" style={{ width: "300px", marginTop: "20px" }} placeholder="Make your own sentence here..." />
            </div>
          )}
        </>
      )}

      {currentPage === 2 && (
        <>
          {sentence_starters_word_2 && <h3>{sentence_starters_word_2}</h3>}
          {sentence_starters_2 && (
            <div>
              {sentence_starters_2.map((sentence, index) => renderSentenceWithInput(sentence, index))}
              <input type="text" style={{ width: "300px", marginTop: "20px" }} placeholder="Make your own sentence here..." />
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === 2}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SentenceStartersPage;
*/
/*
import React, { useState } from "react";
import PassageArray from "../components/Passage_Array";
import WordWithPopUp from "../utils/WordWithPopUp";

const SentenceStartersPage = () => {
  // Find the relevant passage with sentence starters
  const sentenceStarterPassage = PassageArray.find(
    (passage) => passage.type === "practice" && passage.exercise_type === "sentence_builder"
  );

  // Destructure the required properties
  const { sentence_starters_word_1, sentence_starters_1, sentence_starters_word_2, sentence_starters_2 } = sentenceStarterPassage || {};

  const [userInputs, setUserInputs] = useState({});

  const handleInputChange = (index, value) => {
    setUserInputs((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const renderSentenceWithInput = (sentence, index) => {
    const parts = sentence.split("BLANK");
    return (
      <div key={index} className="sentence-with-input">
        {parts[0]}
        <input
          type="text"
          value={userInputs[index] || ""}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="sentence-input"
        />
        {parts[1]}
      </div>
    );
  };

  return (
    <div className="sentence_builder">
      <h2>Finish these sentences!</h2>

      {sentence_starters_word_1 && <h3>{sentence_starters_word_1}</h3>}
      {sentence_starters_1 && (
        <ul>
          {sentence_starters_1.map((sentence, index) => (
            <li key={index}>{renderSentenceWithInput(sentence, index)}</li>
          ))}
          <input type="text" style={{ width:"300px" }} ></input>
        </ul>
      )}

      {sentence_starters_word_2 && <h3>{sentence_starters_word_2}</h3>}
      {sentence_starters_2 && (
        <ul>
          {sentence_starters_2.map((sentence, index) => (
            <li key={index}>{renderSentenceWithInput(sentence, index)}</li>
          ))}
          <input type="text" style={{ width:"300px" }} ></input>
        </ul>
      )}
    </div>
  );
};

export default SentenceStartersPage;
*/