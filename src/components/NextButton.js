import React from 'react';

const NextButton = ({dispatch, answer, index, numQuestions}) => {
    if (answer === null) return null;
    if(index<numQuestions-1)
    return (
        <button className='btn btn-ui' onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>
    );
    if(index === numQuestions-1)
    return (
        <button className='btn btn-ui' onClick={()=>dispatch({type:"finshed"})}>finished</button>
    );
}

export default NextButton;
