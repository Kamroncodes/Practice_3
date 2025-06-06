function NavButtons( { onBack, onNext, hideBack, hideNext, backButtonText = "Back", nextButtonText = "Next" }) {
    return (
        <div 
        style= {{ 
          display: "flex",
          position: "fixed",
          width: "100vw",
          bottom: "0px",
          left: "0px",
          
        }}>

          {!hideBack && <button className="back_button" 
            onClick={onBack}>
            {backButtonText}</button>}

          {!hideNext && <button className="next_button" 
            onClick={onNext}>
            {nextButtonText}</button>}

        </div>
    );
}

export default NavButtons;