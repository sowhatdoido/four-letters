import React from 'react';
import './index.css';

const LetterButton = (props) => {
  return (
    <div
      className={`LetterButtonWrapper ${props.position}${props.index}`}
      onClick={props.onClick}
    >
      <button
        className="LetterButton"
      >
        <span className="LetterButtonText">{props.children}</span>
      </button>
    </div>
  );
}

export default LetterButton;
