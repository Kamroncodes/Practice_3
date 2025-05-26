import { useState, useRef } from "react";
import ReactDOM from "react-dom";

const WordWithPopUp = ({ text, dictionaryBaseURL, translationBaseURL }) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [currentWord, setCurrentWord] = useState("");
    const [clickedWord, setClickedWord] = useState(""); // Track the word that was clicked
    const closeTimeoutRef = useRef(null);

    const handleClick = (event, word) => {
        const rect = event.target.getBoundingClientRect();
        const popupWidth = 200; // Approximate width of the popup
        const popupHeight = 100; // Approximate height of the popup
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let top = rect.top - popupHeight - 10; // Position above the word with some spacing
        let left = rect.left + rect.width / 2 - popupWidth / 2; // Center horizontally

        // Ensure the popup stays within the viewport
        if (top < 0) {
            top = rect.bottom + 10; // If above is out of bounds, position below the word
        }
        if (left < 0) {
            left = 10; // Prevent the popup from going off the left edge
        } else if (left + popupWidth > viewportWidth) {
            left = viewportWidth - popupWidth - 10; // Prevent the popup from going off the right edge
        }

        // Ensure the popup does not go off the bottom of the viewport
        if (top + popupHeight > viewportHeight) {
            top = viewportHeight - popupHeight - 10; // Adjust to stay within the bottom edge
        }

        setPopupPosition({ top, left });
        setCurrentWord(word);
        setClickedWord(word); // Set the clicked word
        setPopupVisible(true);
    };

    const handleMouseLeave = (word) => {
        // Start a timeout to close the popup after 1 second if leaving the clicked word
        if (word === clickedWord) {
            closeTimeoutRef.current = setTimeout(() => {
                setPopupVisible(false);
                setClickedWord(""); // Reset the clicked word
            }, 400);
        }
    };

    const handleMouseEnter = (word) => {
        // Clear the timeout if the mouse enters the clicked word or popup
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }

        // If the mouse enters a different word, start the closing timer
        if (word !== clickedWord && popupVisible) {
            handleMouseLeave(clickedWord);
        }
    };

const renderWordWithSpan = (text) => {
    return text.split(" ").map((word, index) => {
        // Replace underscores with spaces for rendering
        const displayWord = word.replace(/_/g, " ");

        const match = displayWord.match(/[.!?()'",]$/);
        if (/\d/.test(displayWord)) {
            return <span key={index}>{displayWord} </span>;
        } else if (match) {
            const punctuation = match[0];
            const coreWord = displayWord.slice(0, -1);
            return (
                <span key={index} className="nospan">
                    <span
                        className="realspan"
                        onClick={(event) => handleClick(event, coreWord)}
                        onMouseLeave={() => handleMouseLeave(coreWord)}
                        onMouseEnter={() => handleMouseEnter(coreWord)}
                        style={{ cursor: "pointer" }}
                    >
                        {coreWord}
                    </span>
                    {punctuation}{" "}
                </span>
            );
        } else {
            return (
                <span
                    key={index}
                    className="realspan"
                    onClick={(event) => handleClick(event, displayWord)}
                    onMouseLeave={() => handleMouseLeave(displayWord)}
                    onMouseEnter={() => handleMouseEnter(displayWord)}
                    style={{ cursor: "pointer" }}
                >
                    {displayWord}{" "}
                </span>
            );
        }
    });
};

    

    return (
        <>
            <span>{renderWordWithSpan(text)}</span>
            {popupVisible &&
                ReactDOM.createPortal(
                    <div
                        className="TransDictPopUpBox"
                        onMouseEnter={() => handleMouseEnter(clickedWord)} // Stop the timer when the mouse enters the popup
                        onMouseLeave={() => handleMouseLeave(clickedWord)} // Restart the timer when the mouse leaves the popup
                        style={{
                            position: "fixed",
                            top: `${popupPosition.top}px`,
                            left: `${popupPosition.left}px`,
                            transform: "translateX(0)",
                            backgroundColor: "white",
                            border: "1px solid black",
                            padding: "10px",
                            zIndex: 2,
                            width: "200px", // Set a fixed width for consistency
                        }}
                    >
                        <a
                            target="_blank"
                            href={`${dictionaryBaseURL}${currentWord}`}
                            rel="noopener noreferrer"
                            style={{ display: "block" }}
                        >
                            English Dictionary
                        </a>
                        <a
                            target="_blank"
                            href={`${translationBaseURL}${currentWord}`}
                            rel="noopener noreferrer"
                        >
                            Translation
                        </a>
                    </div>,
                    document.body // Render the popup at the root level
                )}
        </>
    );
};

export default WordWithPopUp;
