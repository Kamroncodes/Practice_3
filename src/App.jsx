      /* CORE */

import { useState } from 'react'
import './App.css'
import { Parallax } from "react-parallax"

      /* UTILITIES & FUNCTIONS */
      
import NavButtons from './utils/NavButtons';
import WordWithPopUp from './utils/WordWithPopUp';
import NavBar from './utils/NavBar.jsx';

      /* PASSAGES */

import PassageArray from './components/Passage_Array_3';

      /* EXERCISES - REVIEW AND PRACTICE */

import Review_Ex_clozefromstory from './pages/Rev_Exc_clozefromstory.jsx';
import MatchingTranslationReviewPage from './pages/Rev_Exc_matchtranslation.jsx';
import ClozeExampleSentence from './pages/Pr_Exc_clozeexamplesentence.jsx';
import SentenceStartersPage from './pages/Pr_Exc_sentencestarters.jsx';
import Practice_Ex_clozenewstory from './pages/Pr_Exc_clozenewstory.jsx';
import SpellingPage from './pages/Pr_Exc_spelling.jsx';
import AITutor from './utils/AITutor.jsx';



function App() {

        /* PASSAGE MANIPULATION */

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPassage = PassageArray[currentIndex];
  const [showNextButton, setShowNextButton] = useState(true);
  const [showNavBar, setShowNavBar] = useState(false);
  const [isSpellingComplete, setIsSpellingComplete] = useState(false);

const handleNavigation = (direction) => {
  if (direction === "next") {
    if (currentPassage.type === "review" && currentPassage.exercise === "matching_translation") {
      const practiceSelectionIndex = PassageArray.findIndex(
        (passage) => passage.type === "practice" && passage.exercise_selection
      );
      if (practiceSelectionIndex !== -1) {
        setCurrentIndex(practiceSelectionIndex);
      } else {
        console.error("Practice Exercise Selection Page not found in PassageArray");
      }
    } else if (currentIndex < PassageArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  } else if (direction === "back") {
      if (currentPassage.type === "ending_page") {
        // Navigate back to the title page
        const titlePageIndex = PassageArray.findIndex(
          (passage) => passage.type === "title_page"
        );
        if (titlePageIndex !== -1) {
          setCurrentIndex(titlePageIndex);
        } else {
          console.error("Title Page not found in PassageArray");
        }
  } else if (currentPassage.page === "Practice_Main_Page") {
      // Navigate back to the Review Exercise Selection Page
      const reviewSelectionIndex = PassageArray.findIndex(
        (passage) => passage.type === "review" && passage.page === "Review_Main_Page"
      );
      if (reviewSelectionIndex !== -1) {
        setCurrentIndex(reviewSelectionIndex);
      } else {
        console.error("Review Exercise Selection Page not found in PassageArray");
      }
    } else if (currentPassage.type === "practice") {
      // Navigate back to the Practice Exercise Selection Page
      const practiceSelectionIndex = PassageArray.findIndex(
        (passage) => passage.type === "practice" && passage.page === "Practice_Main_Page"
      );
      if (practiceSelectionIndex !== -1) {
        setCurrentIndex(practiceSelectionIndex);
      } else {
        console.error("Practice Exercise Selection Page not found in PassageArray");
      }
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }
};

        /* POPUP URLS */

const dictionaryBaseURL = "https://dictionary.cambridge.org/dictionary/learner-english/";
const translationBaseURL = "https://www.deepl.com/en/translator?hl=en#en/ja/"


      /* RENDERING WORDS WITH POPUP */

  const renderWordWithSpan= (text) => (
    <WordWithPopUp
    text={text}
    dictionaryBaseURL={dictionaryBaseURL}
    translationBaseURL={translationBaseURL}
    />
  );

      /* RETURNING THE APP */
  

  return (
    <>


 {!showNavBar && (
    <button
      className="nav-toggle-button"
      onClick={() => setShowNavBar(true)}
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 1001,
        background: "none",
        border: "none",
        color: "white",
        fontSize: "1.5rem",
        cursor: "pointer",
      }}
    >
      ☰
    </button>
  )}


  {showNavBar && (
    <NavBar
      passages={PassageArray}
      onNavigate={(index) => {
        setCurrentIndex(index);
        setShowNavBar(false); // Close the NavBar after navigation
      }}
      onClose={() => setShowNavBar(false)} // Close the NavBar when the close button is clicked
    />
  )}

    {currentPassage.type === "title_page" && (
      <div className="title_page">
        <div className="title_page_text">
          <h1>{renderWordWithSpan(currentPassage.title_page_title)}</h1>
              
          {currentPassage.title_page_instructions.map((instruction, index) => (
          <p key={index}>{renderWordWithSpan(instruction)}</p>
          ))}

        </div>
        <img src={currentPassage.title_page_img} alt="Title Page Welcome Image" />
      </div>
    )}


    {currentPassage.type === "vocabulary_page" && (
      <>

      <div className="passage_header">

        {currentPassage.lesson_title && (
        <h2 className="lesson_title">{renderWordWithSpan(currentPassage.lesson_title)}</h2>
        )}

        {currentPassage.section_title && (
        <p className="section_title">{renderWordWithSpan(currentPassage.section_title)}</p>
        )}

      </div>

      {currentPassage.subtitle && (
      <h4 className="subtitle">{renderWordWithSpan(currentPassage.subtitle)}</h4>
      )}

      {currentPassage.passage_title && (        
      <h2 className="passage_title">{renderWordWithSpan(currentPassage.passage_title)}</h2>
      )}

      <div className="vocabulary_body">

        {currentPassage.vocabulary_wordlist && (
        <div className="vocabulary_wordlist">
          {currentPassage.vocabulary_wordlist.map((word, index) => (
          <p key={index}>{renderWordWithSpan(word)}</p>))}
        </div>
        )}

        {currentPassage.instructions && (
        <div className="instructions">
          {currentPassage.instructions.map((instruction, index) => (
          <p key={index}>{renderWordWithSpan(instruction)}</p>))}
        </div>
        )}

      </div>

      {currentPassage.definitions && (
      <div className="definitions">
        {currentPassage.definitions.map((def, index) => (
        <p key={index}>{renderWordWithSpan(def)}</p>
        ))}
      </div>
      )}

      <div className="example_body">

        {currentPassage.example_imgs && (
        <img className="example_imgs" src={currentPassage.example_imgs}></img>
        )}

        {currentPassage.examples && (
        <div className="examples">
          {currentPassage.examples.map((example, index) => (
          <p key={index}>{renderWordWithSpan(example)}</p>))}
        </div>
        )}

      </div>

      {currentPassage.translations && (
      <h4 className="translations">{renderWordWithSpan(currentPassage.translations)}</h4>
      )}

      </>
    )}


    {currentPassage.type === "story" && (
    <>  
        
      <Parallax
        bgImage="/public/images/StudentIntro2.svg"
        strength={50}
        style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        }}>
      </Parallax>

      <div className="passage_header">

        {currentPassage.lesson_title && (
        <h2 className="lesson_title">{renderWordWithSpan(currentPassage.lesson_title)}</h2>
        )}

      </div>

      <div className="story_body">

        {currentPassage.section_title && (
        <h4 className="section_title">{renderWordWithSpan(currentPassage.section_title)}</h4>
        )}

        {currentPassage.passage_title && (
        <h2 className="passage_title">{renderWordWithSpan(currentPassage.passage_title)}</h2>
        )}

        {currentPassage.instructions && (
        <div className="story_instructions">
          {currentPassage.instructions.map((instruction, index) => (
          <p key={index}>{renderWordWithSpan(instruction)}</p>))}
        </div>
        )}

        <img src="/public/images/DownArrow.gif" 
          style={{
            marginTop: "1%",
            height: "80px",
        }}/>
    
        <div style={{ height: "50vh" }} />
    
          <div className="story_text_div" style={{ textAlign: "center" }}>
            {currentPassage.story_text.map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
    
        <div style={{ height: "100vh" }} />

        <p>THE END</p>
      </div>           
    </>
    )}


    {currentPassage.type === "review" && (
    <> 

      <div className="passage_header">

        {currentPassage.lesson_title && (
        <h2 className="lesson_title">{renderWordWithSpan(currentPassage.lesson_title)}</h2>
        )}

        {currentPassage.section_title && (
        <p className="section_title">{renderWordWithSpan(currentPassage.section_title)}</p>
        )}

      </div>

      {currentPassage.subtitle && (
      <h4 className="subtitle">{renderWordWithSpan(currentPassage.subtitle)}</h4>
      )}

      {currentPassage.passage_title && (
      <h2 className="passage_title">{renderWordWithSpan(currentPassage.passage_title)}</h2>
      )}

      {currentPassage.instructions && (
      <div className="instructions translate">
        {currentPassage.instructions.map((instruction, index) => (
        <p key={index}>{renderWordWithSpan(instruction)}</p>))}
      </div>
      )}

      {currentPassage.exercise_selection && (
      <div className="exercise_selection translate">
        {currentPassage.exercise_selection.map((exercise, index) => (
        <button
          key={index}
          onClick={() => {
          
          // Add navigation logic for each button
          if (exercise === "1. Match the vocabulary words to correct translation") {
            const matchingIndex = PassageArray.findIndex(
              (passage) => passage.exercise === "matching_translation"
            );
            if (matchingIndex !== -1) {
              console.log("Navigating to passage with exercise: matching_translation");
              setCurrentIndex(matchingIndex);
            } else {
              console.log("Passage with exercise: matching_translation not found");
            }
          } else if (exercise === "2. Go through the story again and fill in the missing vocabulary words") {
            const clozeIndex = PassageArray.findIndex(
              (passage) => passage.exercise === "cloze_story"
            );
            if (clozeIndex !== -1) {
              console.log("Navigating to passage with exercise: cloze_story");
              setCurrentIndex(clozeIndex);
            } else {
              console.log("Passage with exercise: cloze_story not found");
            }
          } else {
            console.log("No matching navigation logic for this exercise");
          }}}>
        {exercise.replace(/_/g, " ")}
        </button>
        ))}
      </div>
      )}

      {currentPassage.story_text && (
      <Review_Ex_clozefromstory
        storyText={currentPassage.story_text}
        vocabularyWordlist={currentPassage.vocabulary_wordlist}
        renderWordWithSpan={renderWordWithSpan}
        reviewButtonText={currentPassage.review_button}
        setShowNextButton={setShowNextButton}
        setCurrentIndex={setCurrentIndex}
      />
      )}

      {currentPassage.type === "review" && currentPassage.exercise === "matching_translation" && (
      <MatchingTranslationReviewPage setShowNextButton={setShowNextButton} />
      )}

    </>
    )}


    {currentPassage.type === "practice" && (
    <>

      <div className="passage_header">

        {currentPassage.lesson_title && (
        <h2 className="lesson_title">{renderWordWithSpan(currentPassage.lesson_title)}</h2>
        )}

        {currentPassage.section_title && (
        <p className="section_title">{renderWordWithSpan(currentPassage.section_title)}</p>
        )}

      </div>

      {currentPassage.subtitle && (
      <h4 className="subtitle">{renderWordWithSpan(currentPassage.subtitle)}</h4>
      )}

      {currentPassage.passage_title && (
      <h2 className="passage_title">{renderWordWithSpan(currentPassage.passage_title)}</h2>
      )}

      {currentPassage.instructions && (
      <div className="instructions">
        {currentPassage.instructions.map((instruction, index) => (
        <p key={index}>{renderWordWithSpan(instruction)}</p>))}
      </div>
      )}

      {currentPassage.exercise_selection && (
      <div className="exercise_selection translate">
        {currentPassage.exercise_selection.map((exercise, index) => (
        <button
        key={index}
        onClick={() => {
          if (exercise === "1. Fill in the blank in an example sentence") {
            const clozeExampleIndex = PassageArray.findIndex(
              (passage) => passage.exercise === "cloze_example"
            );
            if (clozeExampleIndex !== -1) {
              setCurrentIndex(clozeExampleIndex);
            } else {
              console.error("Cloze Example Exercise not found in PassageArray");
            }
          } else if (exercise === "2. Build your own sentence") {
            const sentenceBuilderIndex = PassageArray.findIndex(
              (passage) => passage.exercise === "sentence_builder"
            );
            if (sentenceBuilderIndex !== -1) {
              setCurrentIndex(sentenceBuilderIndex);
            } else {
              console.error("Sentence Builder Exercise not found in PassageArray");
            }
          } else if (exercise === "3. Read a new story and fill in the missing words.") {
            const clozeNewStoryIndex = PassageArray.findIndex(
              (passage) => passage.exercise === "cloze_new_story"
            );
            if (clozeNewStoryIndex !== -1) {
              setCurrentIndex(clozeNewStoryIndex);
            } else {
              console.error("Cloze New Story Exercise not found in PassageArray");
            }
          } else if (exercise === "4. Spell the words.") {
            const spellingIndex = PassageArray.findIndex(
              (passage) => passage.exercise === "spelling"
            );
            if (spellingIndex !== -1) {
              setCurrentIndex(spellingIndex);
            } else {
              console.error("Spelling Exercise not found in PassageArray");
            }
          } else {
            console.error("No matching navigation logic for this exercise");
          }
        }}
      >
        {exercise}
      </button>
    ))}
      </div>
      )}

      {currentPassage.page === "Practice_Fill-in-the-blank_Example_Sentence_Exercise" && (
        <ClozeExampleSentence 
          exampleSentences={currentPassage.example_sentences}
          vocabularyWordlist={currentPassage.vocabulary_wordlist} 
          renderWordWithSpan={renderWordWithSpan}
          reviewButtonText={currentPassage.review_button}
          setShowNextButton={setShowNextButton}
        />
      )}

      {currentPassage.page === "Practice_Make_Your_Own_Sentence_Exercise" && (
        <>
          <SentenceStartersPage 
            renderWordWithSpan={renderWordWithSpan}
            setShowNextButton={setShowNextButton}
          />
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2.4/shareable.html?configUrl=https://files.bpcontent.cloud/2025/05/13/10/20250513102849-A94BP1U1.json"
            style={{
            position: "static",
            width: "90vw",
            height: "70vh",
            border: "none",
            }}
            title="Botpress Chatbot"
            allow="clipboard-write"
          />
        </>
      )}

      {currentPassage.page === "Practice_Fill-in-the-blank_New_Story_Exercise" && (
        <Practice_Ex_clozenewstory
          newStoryText={currentPassage.new_story_text}
          vocabularyWordlist={currentPassage.vocabulary_wordlist} 
          renderWordWithSpan={renderWordWithSpan}
          reviewButtonText={currentPassage.review_button}
          setShowNextButton={setShowNextButton}
        />
      )}

      {currentPassage.page === "Practice_Spelling_Exercise" && (
      <SpellingPage 
        renderWordWithSpan={renderWordWithSpan}
        setIsSpellingComplete={setIsSpellingComplete}
      />
      )}

    </>
    )}


    {currentPassage.type === "ending_page" && (
      <>
        <div className="ending_page_text">
          <h1>{renderWordWithSpan(currentPassage.lesson_title)}</h1>
              
          {currentPassage.instructions.map((instruction, index) => (
          <p key={index}>{renderWordWithSpan(instruction)}</p>
          ))}

        </div>
        <img src={currentPassage.ending_page_img} alt="Ending Page Image" />
      </>
    )}

    <NavButtons 
      onBack={() => handleNavigation("back")}
      onNext={() => handleNavigation("next")}
        hideBack={
    currentIndex === 0 ||
      (currentPassage.type === "review" && currentPassage.exercise === "cloze_story")
  }
  hideNext={
    !showNextButton || 
    currentIndex === PassageArray.length - 1 || 
    currentPassage.exercise_selection || 
    (currentPassage.page === "Practice_Spelling_Exercise" && !isSpellingComplete) // Hide "Next" until spelling is complete
  }
        backButtonText={
          currentPassage.type === "review" && currentPassage.exercise === "matching_translation"
            ? "Back to Exercise Selection Menu" : "Back" }
    />  


  </>
  );
}

export default App
