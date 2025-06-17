import PassageArray from "../components/Passage_Array_3b";
import React, { useState } from "react";

const VocabCheatSheet = ({ vocabulary }) => {
  const [open, setOpen] = useState(false);

  const getVocabPage = (word) =>
    PassageArray.find(
      (p) =>
        p.type === "vocabulary_page" &&
        p.passage_title &&
        p.passage_title.replace(/_/g, " ").toLowerCase() === word.replace(/_/g, " ").toLowerCase()
    );

  return (
    <div
      style={{
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "black",
        marginTop: "2em",
        marginBottom: "2em",
      }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          marginBottom: "0.5em",
        }}
      >
        {open ? "Hide Vocabulary Cheat Sheet" : "Show Vocabulary Cheat Sheet"}
      </button>
      {open && (
        <div
          style={{
            border: "1px solid #ccc",
            background: "#fafafa",
            padding: "1em",
            minWidth: "250px",
            maxWidth: "70vw",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {vocabulary.map((word, idx) => {
              const vocabPage = getVocabPage(word);
              return (
                <li key={idx} style={{ marginBottom: "1em" }}>
                  <strong>{word.replace(/_/g, " ")}</strong>
                  {vocabPage && (
                    <>
                      <div>
                        <em>Definition:</em> {vocabPage.definitions ? vocabPage.definitions[0] : ""}
                      </div>
                      <div>
                        <em>Translation:</em> {vocabPage.translations || ""}
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VocabCheatSheet;



/*
import PassageArray from "../components/Passage_Array_3b";

const VocabCheatSheet = ({ vocabulary }) => {
  // Helper to find the vocab page for a word
  const getVocabPage = (word) =>
    PassageArray.find(
      (p) =>
        p.type === "vocabulary_page" &&
        p.passage_title &&
        p.passage_title.replace(/_/g, " ").toLowerCase() === word.replace(/_/g, " ").toLowerCase()
    );

  return (
    <div style={{ margin: "1em 0", textAlign: "left" }}>
      <button
        onClick={() => {
          const sheet = document.getElementById("vocab-sheet");
          if (sheet) sheet.style.display = sheet.style.display === "none" ? "block" : "none";
        }}
        style={{
            position: "absolute",
            left: "50%",
            bottom: "3vh",
            transform: "translateX(-50%)",
            zIndex: 1000,
        }}
      >
        Show/Hide Vocabulary Cheat Sheet
      </button>
      <div id="vocab-sheet" style={{ display: "none", border: "1px solid #ccc", padding: "1em", background: "#fafafa" }}>
        <ul style={{ listStyle: "none", padding: 0, color: "black" }}>
          {vocabulary.map((word, idx) => {
            const vocabPage = getVocabPage(word);
            return (
              <li key={idx} style={{ marginBottom: "1em" }}>
                <strong>{word.replace(/_/g, " ")}</strong>
                {vocabPage && (
                  <>
                    <div>
                      <em>Definition:</em> {vocabPage.definitions ? vocabPage.definitions[0] : ""}
                    </div>
                    <div>
                      <em>Translation:</em> {vocabPage.translations || ""}
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default VocabCheatSheet;
*/

/*
import React, { useState } from "react";

const VocabCheatSheet = ({ vocabulary }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen((prev) => !prev)}>
        {open ? "Hide Vocabulary" : "Show Vocabulary"}
      </button>
      {open && (
        <ul
          style={{
            position: "absolute",
            top: "2.5em",
            left: 0,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "1em",
            zIndex: 1000,
            listStyle: "none",
            minWidth: "200px",
            color: "black",
          }}
        >
          {vocabulary.map((word, idx) => (
            <li key={idx}>{word.replace(/_/g, " ")}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VocabCheatSheet;
*/