import React, { useState } from "react";
import "./NavBar.css";

const NavBar = ({ passages, onNavigate, onClose }) => {
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  return (
    
    <div className="nav-bar">
      <button className="close-button" onClick={onClose}>
        ✖
      </button>
      <ul>
        {/* Title Page */}
        {passages
          .filter((passage) => passage.type === "title_page")
          .map((passage) => (
            <li key={passage.page}>
              <button onClick={() => onNavigate(passages.indexOf(passage))}>
                {passage.page.replace(/_/g, " ")}
              </button>
            </li>
          ))}

        {/* Vocabulary Section */}
        <li>
          <button onClick={() => setShowVocabulary(!showVocabulary)}>
            Vocabulary {showVocabulary ? "▲" : "▼"}
          </button>
        </li>
        {showVocabulary && (
          <>
      {/* Vocabulary Main Page */}
    {passages
      .filter((passage) => passage.page === "Vocabulary_Main_Page")
      .map((passage) => {
        const originalIndex = passages.indexOf(passage); // Get the original index
        return (
          <li key={passage.page} style={{ marginLeft: "20px" }}>
            <button onClick={() => onNavigate(originalIndex)}>
              Vocabulary Main Page {/* Explicitly set the button text */}
            </button>
          </li>
        );
      })}

    {/* Vocabulary Subpages */}
    {passages
      .filter(
        (passage) =>
          passage.type === "vocabulary_page" &&
          passage.page !== "Vocabulary_Main_Page" // Exclude the main page
      )
      .map((passage) => {
        const originalIndex = passages.indexOf(passage); // Get the original index
        return (
          <li key={passage.page} style={{ marginLeft: "20px" }}>
            <button onClick={() => onNavigate(originalIndex)}>
              {passage.passage_title.replace(/_/g, " ")} {/* Render subpages */}
            </button>
          </li>
        );
      })}
          </>
        )}

        {/* Story Section */}
        {passages
          .filter((passage) => passage.type === "story")
          .map((passage) => (
            <li key={passage.page}>
              <button onClick={() => onNavigate(passages.indexOf(passage))}>
                {passage.page.replace(/_/g, " ")}
              </button>
            </li>
          ))}

        {/* Review Section */}
        <li>
          <button onClick={() => setShowReview(!showReview)}>
            Review {showReview ? "▲" : "▼"}
          </button>
        </li>
{showReview && (
  <>
    {/* Review Main Page */}
    {passages
      .filter((passage) => passage.page === "Review_Main_Page")
      .map((passage) => (
        <li key={passage.page} style={{ marginLeft: "20px" }}>
          <button onClick={() => onNavigate(passages.indexOf(passage))}>
            Review Main Page
          </button>
        </li>
      ))}
    {/* Review Subpages */}
    {passages
      .filter(
        (passage) =>
          passage.type === "review" &&
          passage.page !== "Review_Main_Page"
      )
      .map((passage) => (
        <li key={passage.page} style={{ marginLeft: "20px" }}>
          <button onClick={() => onNavigate(passages.indexOf(passage))}>
            {(passage.passage_title ||
              passage.page.replace(/review/gi, "").replace(/_/g, " ").trim())}
          </button>
        </li>
      ))}
  </>
)}

        {/* Practice Section */}
        <li>
          <button onClick={() => setShowPractice(!showPractice)}>
            Practice {showPractice ? "▲" : "▼"}
          </button>
        </li>
        {showPractice &&
        <>
    {passages
      .filter((passage) => passage.page === "Practice_Main_Page")
      .map((passage) => (
        <li key={passage.page} style={{ marginLeft: "20px" }}>
          <button onClick={() => onNavigate(passages.indexOf(passage))}>
            Practice Main Page
          </button>
        </li>
      ))}
    {passages
      .filter(
        (passage) =>
          passage.type === "practice" &&
          passage.page !== "Practice_Main_Page"
      )
      .map((passage) => (
        <li key={passage.page} style={{ marginLeft: "20px" }}>
          <button onClick={() => onNavigate(passages.indexOf(passage))}>
            {(passage.passage_title ||
              passage.page.replace(/practice/gi, "").replace(/_/g, " ").trim())}
          </button>
        </li>
      ))}
      </>}
    </ul>
  </div>
);
};

export default NavBar;

/*
import React from "react";
import "./NavBar.css";

const NavBar = ({ passages, onNavigate, onClose }) => {
  return (
    <div className="nav-bar">
      <button className="close-button" onClick={onClose}>
        ✖
      </button>
      <ul>
        {passages.map((passage, index) => (
          <li key={index}>
            <button onClick={() => onNavigate(index)}>
              {passage.page.replace(/_/g, " ")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
*/