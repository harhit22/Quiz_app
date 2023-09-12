import React from "react";

const Options = ({ question, dispatch, answer }) => {
    const hasAnswerd = answer !==null
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? "answer":""} ${hasAnswerd ? index === question.correctOption ? "correct":"wrong":''}`}
          disabled = {hasAnswerd}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
