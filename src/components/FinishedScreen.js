import React from 'react';

const FinishedScreen = ({ maxPossisblePoints, points, highScore, dispatch }) => {
    const percentage = (points / maxPossisblePoints) * 100;
    return (
        <>
            <p className='result'>
                you scored {points}/{maxPossisblePoints} ❤️ {Math.ceil(percentage)}
            </p>
            <p className='highscore'>Highscore: {highScore} points</p>
            <button className='btn btn-ui' onClick={()=>dispatch({type:"restart"})}>Restart</button>
        </>
    );
}

export default FinishedScreen;
