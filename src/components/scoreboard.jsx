import { useState } from "react";

const Scoreboard = ({score}) => {



    return (
        <div className="scoreboard-container">
            <p>Current Score: { score.currentScore }<br></br>High Score: {score.highScore}</p>
        </div>
    )
}

export {Scoreboard}