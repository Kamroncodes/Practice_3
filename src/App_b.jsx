      /* CORE */

import { useState, useEffect, useRef } from 'react'
import './App.css'
// import { Parallax } from "react-parallax"
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

      /* UTILITIES & FUNCTIONS */
      
import NavButtons from './utils/NavButtons';
import WordWithPopUp from './utils/WordWithPopUp';
import NavBar from './utils/NavBar.jsx';

      /* PASSAGES */

import PassageArray from './components/Passage_Array_3b.jsx';

      /* EXERCISES - REVIEW AND PRACTICE */

import Review_Ex_clozefromstory from './pages/Rev_Exc_clozefromstory.jsx';
import MatchingTranslationReviewPage from './pages/Rev_Exc_matchtranslation.jsx';
import ClozeExampleSentence from './pages/Pr_Exc_clozeexamplesentence.jsx';
import SentenceStartersPage from './pages/Pr_Exc_sentencestarters.jsx';
import Practice_Ex_clozenewstory from './pages/Pr_Exc_clozenewstory.jsx';
import SpellingPage from './pages/Pr_Exc_spelling.jsx';

      /* AUDIO PLAYER */
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';



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
  const parallaxRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const audioRefs = useRef([]);

// State and effect
const [playbackRates, setPlaybackRates] = useState([]);
useEffect(() => {
  const storyTextLength = Array.isArray(currentPassage.story_text) ? currentPassage.story_text.length : 0;
  setPlaybackRates(Array(storyTextLength).fill(1));
}, [currentPassage]);

// Handler 
const handleRateChange = (idx, value) => {
  const newRates = [...playbackRates];
  newRates[idx] = value;
  setPlaybackRates(newRates);
  if (audioRefs.current[idx]) {
    audioRefs.current[idx].audio.current.playbackRate = value;
  }
};

const handleNavigation = (direction) => {
  if (direction === "next") {
    // If on one of the four practice exercise pages, go to ending page
    if (
      [
        "Practice_Fill-in-the-blank_Example_Sentence_Exercise",
        "Practice_Make_Your_Own_Sentence_Exercise",
        "Practice_Fill-in-the-blank_New_Story_Exercise",
        "Practice_Spelling_Exercise"
      ].includes(currentPassage.page)
    ) {
      const endingPageIndex = PassageArray.findIndex(
        (passage) => passage.type === "ending_page"
      );
      if (endingPageIndex !== -1) {
        setCurrentIndex(endingPageIndex);
        return;
      }
    }
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

const handleScroll = () => {
  const el = parallaxRef.current?.container?.current;
  if (!el) return;
  // Check if user is at (or very near) the bottom
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    setShowNextButton(true);
  }
};

useEffect(() => {
  if (currentPassage.type === "story") {
    setShowNextButton(false);

    const el = parallaxRef.current?.container?.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  } else {
    setShowNextButton(true);
  }
}, [currentPassage]);


        /* POPUP URLS */

const dictionaryBaseURL = "https://dictionary.cambridge.org/dictionary/learner-english/";
const translationBaseURL = "https://dict.longdo.com/search/"

/* Thai to English translation website https://dict.longdo.com/search/ */
/* English to Japanese translation website https://www.deepl.com/en/translator?hl=en#en/ja/ */


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
              src={`${import.meta.env.BASE_URL}${currentPassage.title_page_icons[index]}` && currentPassage.title_page_icons[index]}
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

        {currentPassage.subtitle_1 && (
        <h4 className="subtitle">{renderWordWithSpan(currentPassage.subtitle_1)}</h4>
        )}

        {currentPassage.definitions && (
        <div className="definitions">
            {currentPassage.definitions.map((def, index) => (
            <p key={index}>{renderWordWithSpan(def)}</p>
            ))}
        </div>
         )}

      <div className='syn_tran_box'> 
        <div>
        {currentPassage.subtitle_4 && (
        <h4 className="subtitle">{renderWordWithSpan(currentPassage.subtitle_4)}</h4>
        )}

        {currentPassage.synonyms && (
        <h4 className="synonyms">{renderWordWithSpan(currentPassage.synonyms)}</h4>
        )}
        </div>
        <div>
        {currentPassage.subtitle_3 && (
        <h4 className="subtitle">{renderWordWithSpan(currentPassage.subtitle_3)}</h4>
        )}

        {currentPassage.translations && (
        <h4 className="translations">{renderWordWithSpan(currentPassage.translations)}</h4>
        )}
        </div>
      </div>
      

      <div className="example_body">

        {currentPassage.subtitle_2 && (
        <h4 className="subtitle">{renderWordWithSpan(currentPassage.subtitle_2)}</h4>
        )}

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

      </>
    )}


    {currentPassage.type === "story" && (
    <>  

    <Parallax 
      ref={parallaxRef}
      pages={13.5} 
      style={{ top: '0', left: '0' }}>

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

        <img src={`${import.meta.env.BASE_URL}images/DownArrow.gif`} 
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
          pointerEvents: "none",
          zIndex: -1,
          backgroundImage: `url(${import.meta.env.BASE_URL}images/Car-Bg1.svg)`,
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
          pointerEvents: "none",
        zIndex: -1,
        backgroundImage: `url(${import.meta.env.BASE_URL}images/Car-Bg2.svg)`,
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
          pointerEvents: "none",
        zIndex: -1,
        backgroundImage: `url(${import.meta.env.BASE_URL}images/Car-Fg.svg)`,
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
      {(() => {
      const sliceStart = 0, sliceEnd = 2;
      return currentPassage.story_text.slice(sliceStart, sliceEnd).map((story, index) => (
        <div key={index + sliceStart} style={{ display: expandedIndex === index + sliceStart ? "block" : "flex", alignItems: "center", marginBottom: "1rem", transition: "display 0.7s" }}>
          <p style={{ margin: 0 }}>{renderWordWithSpan(story)}</p>
          <div
            className={`audio_player_container${expandedIndex === index + sliceStart ? " expanded" : ""}`}
            style={{
              transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              width: expandedIndex === index + sliceStart ? "350px" : "60px",
              minWidth: expandedIndex === index + sliceStart ? "350px" : "60px",
              maxWidth: expandedIndex === index + sliceStart ? "350px" : "60px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <AudioPlayer
              ref={el => (audioRefs.current[index + sliceStart] = el)}
              src={
                currentPassage.story_audio
                  ? `${import.meta.env.BASE_URL}audio/${currentPassage.story_audio[index + sliceStart]}`
                  : `${import.meta.env.BASE_URL}audio/SA_${index + sliceStart + 1}.mp3`
              }
              showJumpControls={false}
              customAdditionalControls={
                expandedIndex === index + sliceStart
                  ? [
                  <div key="speed-slider" style={{ display: "flex", alignItems: "center", width: "125px", padding: "0 10px" }}>
                    <label style={{ color: "#fff", fontSize: 12, marginRight: 4 }}>Speed</label>
                    <input
                      type="range"
                      min="0.6"
                      max="1.0"
                      step="0.1"
                      value={playbackRates[index + sliceStart]}
                      onChange={e => handleRateChange(index + sliceStart, parseFloat(e.target.value))}
                      style={{ width: 60 }}
                    />
                    <span style={{ color: "#fff", fontSize: 12, marginLeft: 4 }}>
                    {playbackRates[index + sliceStart]}x
                    </span>
                  </div>
                  ]
                  : []
              }
              customVolumeControls={[]}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/expand-arrows.svg`}
              style={{ height: "15px", cursor: "pointer" }}
              onClick={() => setExpandedIndex(expandedIndex === index + sliceStart ? null : index + sliceStart)}
            />
          </div>
        </div>
      ));
      })()}
      </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={2.25}
        factor={1}
        speed={0.125}>
      <div style={{ height: "30vh" }} />
      <div className="story_text_div parallax_text parallax_text_right">
      {(() => {
      const sliceStart = 2, sliceEnd = 4;
      return currentPassage.story_text.slice(sliceStart, sliceEnd).map((story, index) => (
        <div key={index + sliceStart} style={{ display: expandedIndex === index + sliceStart ? "block" : "flex", alignItems: "center", marginBottom: "1rem", transition: "display 0.7s" }}>
          <p style={{ margin: 0 }}>{renderWordWithSpan(story)}</p>
          <div
            className={`audio_player_container${expandedIndex === index + sliceStart ? " expanded" : ""}`}
            style={{
              transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              width: expandedIndex === index + sliceStart ? "350px" : "60px",
              minWidth: expandedIndex === index + sliceStart ? "350px" : "60px",
              maxWidth: expandedIndex === index + sliceStart ? "350px" : "60px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <AudioPlayer
              ref={el => (audioRefs.current[index + sliceStart] = el)}
              src={
                currentPassage.story_audio
                  ? `${import.meta.env.BASE_URL}audio/${currentPassage.story_audio[index + sliceStart]}`
                  : `${import.meta.env.BASE_URL}audio/SA_${index + sliceStart + 1}.mp3`
              }
              showJumpControls={false}
              customAdditionalControls={
                expandedIndex === index + sliceStart
                  ? [
                  <div key="speed-slider" style={{ display: "flex", alignItems: "center", width: "125px", padding: "0 10px" }}>
                    <label style={{ color: "#fff", fontSize: 12, marginRight: 4 }}>Speed</label>
                    <input
                      type="range"
                      min="0.6"
                      max="1.0"
                      step="0.1"
                      value={playbackRates[index + sliceStart]}
                      onChange={e => handleRateChange(index + sliceStart, parseFloat(e.target.value))}
                      style={{ width: 60 }}
                    />
                    <span style={{ color: "#fff", fontSize: 12, marginLeft: 4 }}>
                    {playbackRates[index + sliceStart]}x
                    </span>
                  </div>
                  ]
                  : []
              }
              customVolumeControls={[]}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/expand-arrows.svg`}
              style={{ height: "15px", cursor: "pointer" }}
              onClick={() => setExpandedIndex(expandedIndex === index + sliceStart ? null : index + sliceStart)}
            />
          </div>
        </div>
      ));
      })()}
      </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={3.25}
        factor={1}
        speed={0.125}>
      <div style={{ height: "30vh" }} />
      <div className="story_text_div parallax_text parallax_text_right">
      {(() => {
      const sliceStart = 4, sliceEnd = 5;
      return currentPassage.story_text.slice(sliceStart, sliceEnd).map((story, index) => (
        <div key={index + sliceStart} style={{ display: expandedIndex === index + sliceStart ? "block" : "flex", alignItems: "center", marginBottom: "1rem", transition: "display 0.7s" }}>
          <p style={{ margin: 0 }}>{renderWordWithSpan(story)}</p>
          <div
            className={`audio_player_container${expandedIndex === index + sliceStart ? " expanded" : ""}`}
            style={{
              transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              width: expandedIndex === index + sliceStart ? "350px" : "60px",
              minWidth: expandedIndex === index + sliceStart ? "350px" : "60px",
              maxWidth: expandedIndex === index + sliceStart ? "350px" : "60px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <AudioPlayer
              ref={el => (audioRefs.current[index + sliceStart] = el)}
              src={
                currentPassage.story_audio
                  ? `${import.meta.env.BASE_URL}audio/${currentPassage.story_audio[index + sliceStart]}`
                  : `${import.meta.env.BASE_URL}audio/SA_${index + sliceStart + 1}.mp3`
              }
              showJumpControls={false}
              customAdditionalControls={
                expandedIndex === index + sliceStart
                  ? [
                  <div key="speed-slider" style={{ display: "flex", alignItems: "center", width: "125px", padding: "0 10px" }}>
                    <label style={{ color: "#fff", fontSize: 12, marginRight: 4 }}>Speed</label>
                    <input
                      type="range"
                      min="0.6"
                      max="1.0"
                      step="0.1"
                      value={playbackRates[index + sliceStart]}
                      onChange={e => handleRateChange(index + sliceStart, parseFloat(e.target.value))}
                      style={{ width: 60 }}
                    />
                    <span style={{ color: "#fff", fontSize: 12, marginLeft: 4 }}>
                    {playbackRates[index + sliceStart]}x
                    </span>
                  </div>
                  ]
                  : []
              }
              customVolumeControls={[]}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/expand-arrows.svg`}
              style={{ height: "15px", cursor: "pointer" }}
              onClick={() => setExpandedIndex(expandedIndex === index + sliceStart ? null : index + sliceStart)}
            />
          </div>
        </div>
      ));
      })()}
      </div>
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{ start: 4.5, end: 13}}
        offset={4.5}
        factor={1}
        speed={0}
        style={{
          pointerEvents: "none",
        zIndex: -1,
        backgroundImage: `url(${import.meta.env.BASE_URL}images/Class-Bg.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
      </ParallaxLayer>

      <ParallaxLayer
        sticky={{ start: 4.5, end: 11.5}}
        offset={4.5}
        factor={1}
        speed={0}
        style={{
          pointerEvents: "none",
        zIndex: 1,
        backgroundImage: `url(${import.meta.env.BASE_URL}images/Class-Bg1.svg)`,
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
      {(() => {
      const sliceStart = 5, sliceEnd = 7;
      return currentPassage.story_text.slice(sliceStart, sliceEnd).map((story, index) => (
        <div key={index + sliceStart} style={{ display: expandedIndex === index + sliceStart ? "block" : "flex", alignItems: "center", marginBottom: "1rem", transition: "display 0.7s" }}>
          <p style={{ margin: 0 }}>{renderWordWithSpan(story)}</p>
          <div
            className={`audio_player_container${expandedIndex === index + sliceStart ? " expanded" : ""}`}
            style={{
              transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              width: expandedIndex === index + sliceStart ? "350px" : "60px",
              minWidth: expandedIndex === index + sliceStart ? "350px" : "60px",
              maxWidth: expandedIndex === index + sliceStart ? "350px" : "60px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <AudioPlayer
              ref={el => (audioRefs.current[index + sliceStart] = el)}
              src={
                currentPassage.story_audio
                  ? `${import.meta.env.BASE_URL}audio/${currentPassage.story_audio[index + sliceStart]}`
                  : `${import.meta.env.BASE_URL}audio/SA_${index + sliceStart + 1}.mp3`
              }
              showJumpControls={false}
              customAdditionalControls={
                expandedIndex === index + sliceStart
                  ? [
                  <div key="speed-slider" style={{ display: "flex", alignItems: "center", width: "125px", padding: "0 10px" }}>
                    <label style={{ color: "#fff", fontSize: 12, marginRight: 4 }}>Speed</label>
                    <input
                      type="range"
                      min="0.6"
                      max="1.0"
                      step="0.1"
                      value={playbackRates[index + sliceStart]}
                      onChange={e => handleRateChange(index + sliceStart, parseFloat(e.target.value))}
                      style={{ width: 60 }}
                    />
                    <span style={{ color: "#fff", fontSize: 12, marginLeft: 4 }}>
                    {playbackRates[index + sliceStart]}x
                    </span>
                  </div>
                  ]
                  : []
              }
              customVolumeControls={[]}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/expand-arrows.svg`}
              style={{ height: "15px", cursor: "pointer" }}
              onClick={() => setExpandedIndex(expandedIndex === index + sliceStart ? null : index + sliceStart)}
            />
          </div>
        </div>
      ));
      })()}
      </div>
      </ParallaxLayer>

      <ParallaxLayer
        offset={4.75}
        factor={1}
        speed={0.5}
        style={{
        pointerEvents: "none",
        zIndex: -1,
        backgroundImage: `url(${import.meta.env.BASE_URL}images/Class-Fg1.svg)`,
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
      {(() => {
      const sliceStart = 7, sliceEnd = 10;
      return currentPassage.story_text.slice(sliceStart, sliceEnd).map((story, index) => (
        <div key={index + sliceStart} style={{ display: expandedIndex === index + sliceStart ? "block" : "flex", alignItems: "center", marginBottom: "1rem", transition: "display 0.7s" }}>
          <p style={{ margin: 0 }}>{renderWordWithSpan(story)}</p>
          <div
            className={`audio_player_container${expandedIndex === index + sliceStart ? " expanded" : ""}`}
            style={{
              transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              width: expandedIndex === index + sliceStart ? "350px" : "60px",
              minWidth: expandedIndex === index + sliceStart ? "350px" : "60px",
              maxWidth: expandedIndex === index + sliceStart ? "350px" : "60px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <AudioPlayer
              ref={el => (audioRefs.current[index + sliceStart] = el)}
              src={
                currentPassage.story_audio
                  ? `${import.meta.env.BASE_URL}audio/${currentPassage.story_audio[index + sliceStart]}`
                  : `${import.meta.env.BASE_URL}audio/SA_${index + sliceStart + 1}.mp3`
              }
              showJumpControls={false}
              customAdditionalControls={
                expandedIndex === index + sliceStart
                  ? [
                  <div key="speed-slider" style={{ display: "flex", alignItems: "center", width: "125px", padding: "0 10px" }}>
                    <label style={{ color: "#fff", fontSize: 12, marginRight: 4 }}>Speed</label>
                    <input
                      type="range"
                      min="0.6"
                      max="1.0"
                      step="0.1"
                      value={playbackRates[index + sliceStart]}
                      onChange={e => handleRateChange(index + sliceStart, parseFloat(e.target.value))}
                      style={{ width: 60 }}
                    />
                    <span style={{ color: "#fff", fontSize: 12, marginLeft: 4 }}>
                    {playbackRates[index + sliceStart]}x
                    </span>
                  </div>
                  ]
                  : []
              }
              customVolumeControls={[]}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/expand-arrows.svg`}
              style={{ height: "15px", cursor: "pointer" }}
              onClick={() => setExpandedIndex(expandedIndex === index + sliceStart ? null : index + sliceStart)}
            />
          </div>
        </div>
      ));
      })()}
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
        pointerEvents: "none",
        zIndex: -1,
        backgroundImage: `url(${import.meta.env.BASE_URL}images/Class-Fg2.svg)`,
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
        sticky={{ start: 10.75, end: 11.5}}
        offset={10.75}
        factor={1}
        speed={0}
        style={{
        pointerEvents: "none",
        zIndex: -1,
        backgroundImage: `url(${import.meta.env.BASE_URL}images/Class-Fg3.svg)`,
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
        nextButtonText={
        [
        "Practice_Fill-in-the-blank_Example_Sentence_Exercise",
        "Practice_Make_Your_Own_Sentence_Exercise",
        "Practice_Fill-in-the-blank_New_Story_Exercise",
        "Practice_Spelling_Exercise"
        ].includes(currentPassage.page)
        ? "Finish the lesson"
        : currentPassage.type === "title_page"
        ? "Let's Start!"
        : undefined
        }
    />  


  </>
  );
}

export default App

/*

      <ParallaxLayer
        offset={2.25}
        factor={1}
        speed={0.125}>
          <div style={{ height: "30vh" }} />
          <div className="story_text_div parallax_text parallax_text_right">
            {currentPassage.story_text.slice(2,4).map((story, index) => (
            <div key={index + 2}>
            <div key={index} style={{ display: expandedIndex === index ? "block" : "flex", alignItems: "center", marginBottom: "1rem", transition: "display 0.7s" }}>
            <p style={{ margin: 0 }}>{renderWordWithSpan(story)}</p>
            <div
              className={`audio_player_container${expandedIndex === index ? " expanded" : ""}`}
              style={{
                transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                width: expandedIndex === index ? "350px" : "60px",
                minWidth: expandedIndex === index ? "350px" : "60px",
                maxWidth: expandedIndex === index ? "350px" : "60px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
            <AudioPlayer
              ref={el => (audioRefs.current[index + 2] = el)}
              src={
                currentPassage.story_audio
                ? `${import.meta.env.BASE_URL}audio/${currentPassage.story_audio[index + 2]}`
                : `${import.meta.env.BASE_URL}audio/SA_${index + 2}.mp3`
              }
              showJumpControls={false}
              customAdditionalControls={
                expandedIndex === index + 2
                ? [
              <div key="speed-slider" style={{ display: "flex", alignItems: "center", width: "125px", padding: "0 10px" }}>
              <label style={{ color: "#fff", fontSize: 12, marginRight: 4 }}>Speed</label>
              <input
              type="range"
              min="0.6"
              max="1.0"
              step="0.1"
              value={playbackRates[index]}
              onChange={e => handleRateChange(index, parseFloat(e.target.value))}
              style={{ width: 60 }}
              />
              <span style={{ color: "#fff", fontSize: 12, marginLeft: 4 }}>
               {playbackRates[index]}x
              </span>
              </div>
              ]
              : []
              }
              customVolumeControls={[]}
            />
          <img
            src={`${import.meta.env.BASE_URL}images/expand-arrows.svg`}
            style={{ height: "15px", cursor: "pointer" }}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          />
          </div>
        </div>
        </div>
        ))}
          </div>
          
      </ParallaxLayer>

*/
/*
      <ParallaxLayer
        offset={1.25}
        factor={1.25}
        speed={0.125}
        style={{
        }}>
          <div style={{ height: "35vh" }} />
          <div className="story_text_div parallax_text parallax_text_right">
            {currentPassage.story_text.slice(0, 2).map((story, index) => (
            <div key={index} style={{ display: expandedIndex === index ? "block" : "flex", alignItems: "center", marginBottom: "1rem" , transition: "display 0.7s"}}>
              <p style={{ margin: 0 }}>{renderWordWithSpan(story)}</p>
              <div
                className={`audio_player_container${expandedIndex === index ? " expanded" : ""}`}
                style={{
                  transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  width: expandedIndex === index ? "350px" : "60px",
                  minWidth: expandedIndex === index ? "350px" : "60px",
                  maxWidth: expandedIndex === index ? "350px" : "60px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"}}>
                <AudioPlayer
                  src={`${import.meta.env.BASE_URL}audio/SA_${index + 1}.mp3`}
                  showJumpControls={false}
                  customAdditionalControls={[]}
                  customVolumeControls={[]}
                />
                <img
                  src={`${import.meta.env.BASE_URL}images/expand-arrows.svg`}
                  style={{ height: "15px", cursor: "pointer" }}
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                />
              </div>
            </div>
          ))}
          </div>
      </ParallaxLayer>

*/

/*
    <div className="audio_player_container"
          style={{
        transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        width: expandedIndex === index ? "350px" : "fit-content",
        minWidth: expandedIndex === index ? "350px" : "fit-content",
        maxWidth: expandedIndex === index ? "350px" : "fit-content",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}>
      <AudioPlayer
        src={`${import.meta.env.BASE_URL}audio/SA_${index + 1}.mp3`}
        showJumpControls={false}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        customProgressBarSection={
          expandedIndex === index
            ? [
                RHAP_UI.CURRENT_TIME,
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.DURATION,
              ]
            : []
        }/>
        <img src={`${import.meta.env.BASE_URL}images/expand-arrows.svg`} style={{ height: "15px", cursor: "pointer"}} 
          onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}/>
    </div>
*/