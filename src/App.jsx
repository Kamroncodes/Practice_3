      /* CORE */

import { useState } from 'react'
import './App.css'
// import { Parallax } from "react-parallax"
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

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

      /* IMAGES */

import CarBg1 from '../public/images/Car-Bg1.svg';
import CarBg2 from '../public/images/Car-Bg2.svg';
import CarFg from '../public/images/Car-Fg.svg';
import ClassBg from '../public/images/Class-Bg.svg';
import ClassBg1 from '../public/images/Class-Bg1.svg';
import ClassBg2 from '../public/images/Class-Bg2.svg';
import ClassFg1 from '../public/images/Class-Fg1.svg';
import ClassFg2 from '../public/images/Class-Fg2.svg';
import ClassFg3 from '../public/images/Class-Fg3.svg';

      /* TITLE PAGE BIG STEP BUTTONS */

const vocabIndex = PassageArray.findIndex(p => p.type === "vocabulary_page" && p.page === "Vocabulary_Main_Page");
const storyIndex = PassageArray.findIndex(p => p.type === "story");
const reviewIndex = PassageArray.findIndex(p => p.type === "review" && p.page === "Review_Main_Page");
const practiceIndex = PassageArray.findIndex(p => p.type === "practice" && p.page === "Practice_Main_Page");

const instructionTargets = [vocabIndex, storyIndex, reviewIndex, practiceIndex];


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
        padding: "0.5rem",
        margin: "3vh auto 0 5vw",
        top: "0px",
        left: "0px",
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
        <h1>{renderWordWithSpan(currentPassage.title_page_title)}</h1>
        <div className="title_page_instructions">
          <img id="title_page_img" src={`${import.meta.env.BASE_URL}${currentPassage.title_page_img}`} alt="Title Page Welcome Image" />
          {currentPassage.title_page_instructions.map((instruction, index) => (
          <button className="instruction_box" key={index} onClick={() => setCurrentIndex(instructionTargets[index])}>
            <img 
              src={currentPassage.title_page_icons && currentPassage.title_page_icons[index]} 
              alt={`Step ${index + 1} icon`} 
              style={{ height: "80%", margin: "auto"}}/>
            <p>{renderWordWithSpan(instruction)}</p>
          </button>
          ))}
        </div>
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
    <Parallax pages={13} style={{ top: '0', left: '0' }}>

      <ParallaxLayer
      offset={0}
      factor={1}
      speed={1}
      >
        <div className="passage_header">

        {currentPassage.lesson_title && (
        <h2 className="lesson_title">{renderWordWithSpan(currentPassage.lesson_title)}</h2>
        )}

      </div>
      <div className="story_body">

        {currentPassage.section_title && (
        <h2 className="section_title">{renderWordWithSpan(currentPassage.section_title)}</h2>
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

        <div style={{ height: "20vh" }} />

        <img src="./public/images/DownArrow.gif" 
          style={{
            marginTop: "1%",
            height: "80px",
        }}/>
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{ start: 1, end: 2.25}}
        offset={1}
        factor={1.25}
        speed={0}
        style={{
          zIndex: -1,
          backgroundImage: `url(${CarBg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{ start: 2.25, end: 4.5}}
        offset={2.25}
        factor={1.25}
        speed={0}
        style={{
        zIndex: -1,
        backgroundImage: `url(${CarBg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{ start: 1, end: 4.5}}
        offset={1}
        factor={1}
        speed={0}
        style={{
        zIndex: -1,
        backgroundImage: `url(${CarFg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
      </ParallaxLayer>

      <ParallaxLayer
        offset={1.25}
        factor={1.25}
        speed={0.125}
        style={{
        }}>
          <div style={{ height: "35vh" }} />
          <div className="story_text_div parallax_text parallax_text_right">
            {currentPassage.story_text.slice(0,2).map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={2.25}
        factor={1}
        speed={0.125}>
          <div style={{ height: "30vh" }} />
          <div className="story_text_div parallax_text parallax_text_right">
            {currentPassage.story_text.slice(2,4).map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={3.25}
        factor={1}
        speed={0.125}>
          <div style={{ height: "30vh" }} />
          <div className="story_text_div parallax_text parallax_text_right">
            {currentPassage.story_text.slice(4,5).map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{ start: 4.5, end: 11.75}}
        offset={4.5}
        factor={1}
        speed={0}
        style={{
        zIndex: -1,
        backgroundImage: `url(${ClassBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{ start: 4.5, end: 11.75}}
        offset={4.5}
        factor={1}
        speed={0}
        style={{
        zIndex: 1,
        backgroundImage: `url(${ClassBg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
      </ParallaxLayer>

      <ParallaxLayer
        offset={4.5}
        factor={1}
        speed={0.125}>
          <div style={{ height: "21vh" }} />
          <div className="story_text_div parallax_text">
            {currentPassage.story_text.slice(5,7).map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={4.75}
        factor={1}
        speed={0.5}
        style={{
        zIndex: -1,
        backgroundImage: `url(${ClassFg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
      </ParallaxLayer>

      <ParallaxLayer
        offset={5.75}
        factor={1}
        speed={0.125}>
          <div style={{ height: "30vh" }} />
          <div className="story_text_div parallax_text">
            {currentPassage.story_text.slice(7,10).map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={6.75}
        factor={1}
        speed={0.125}>
          <div style={{ height: "30vh" }} />
          <div className="story_text_div parallax_text">
            {currentPassage.story_text.slice(10,15).map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={7.75}
        factor={1}
        speed={0.125}>
          <div style={{ height: "30vh" }} />
          <div className="story_text_div parallax_text">
            {currentPassage.story_text.slice(15,20).map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={9}
        factor={1}
        speed={0.5}>
          <div style={{ height: "10vh" }} />
          <div className="story_text_div parallax_text parallax_text_left">
            {currentPassage.story_text.slice(20,22).map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{ start: 9, end: 9}}
        offset={9}
        factor={1}
        speed={0}
        style={{
        zIndex: -1,
        backgroundImage: `url(${ClassFg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
      </ParallaxLayer>

      <ParallaxLayer
        offset={10}
        factor={1}
        speed={0.125}>
          <div style={{ height: "50vh" }} />
          <div className="story_text_div parallax_text">
            {currentPassage.story_text.slice(22,23).map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{ start: 10.75, end: 11.75}}
        offset={10.75}
        factor={1}
        speed={0}
        style={{
        zIndex: -1,
        backgroundImage: `url(${ClassFg3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
      </ParallaxLayer>

      <ParallaxLayer
        offset={10.75}
        factor={1}
        speed={0.125}>
          <div style={{ height: "30vh" }} />
          <div className="story_text_div parallax_text parallax_text_left">
            {currentPassage.story_text.slice(23,26).map((story, index) => (
            <p key={index}>{renderWordWithSpan(story)}</p>))}
          </div>
      </ParallaxLayer>

      </Parallax>

      <div style={{ height: "125vh" }} />
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
          currentPassage.type === "review" && currentPassage.exercise === "matching_translation" ? "Back to Exercise Selection Menu" : "Back" }
    />  


  </>
  );
}

export default App



/* TESTING PARALLAX -- REMOVE SECOND PARALLAX TO WORK WITH JUST REGULAR BACKGROUND IMAGE

      
      <Parallax
        bgImage={CarFg}
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

      <Parallax
        bgImage={CarBg1}
        strength={1}
        style={{
          height: "100vh",
          width: "100vw",
          zIndex: -2,
          top: 0,
          left: 0,
          postion: "fixed",
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
*/