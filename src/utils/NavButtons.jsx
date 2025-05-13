function NavButtons( { onBack, onNext, hideBack, hideNext, backButtonText = "Back" }) {
    return (
        <div>

          {!hideBack && <button className="back_button" 
            onClick={onBack}>
            {backButtonText}</button>}

          {!hideNext && <button className="next_button" 
            onClick={onNext}
            >Next</button>}

        </div>
    );
}

export default NavButtons;