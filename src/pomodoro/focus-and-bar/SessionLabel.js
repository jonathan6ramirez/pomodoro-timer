import React from "react";
import { secondsToDuration, minutesToDuration } from "../../utils/duration";

function SessionLabel ({session, focusDuration, breakDuration, isTimerRunning}) {

const pausedPrompt = {
    display: "flex",
    justifyContent: "center",
}
    if (session != null) {
         return (
             <>
            <div>
            {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
            <div className="row mb-2">
                <div className="col">
                {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
                <h2 data-testid="session-title">
                    {session.label} for {session.label === "Focusing" ? 
                    `${minutesToDuration(focusDuration["focusDuration"])} minutes` : 
                    `${minutesToDuration(breakDuration["breakDuration"])} minutes`}
                </h2>
                {/* TODO: Update message below correctly format the time remaining in the current session */}
                <p className="lead" data-testid="session-sub-title">
                    {secondsToDuration(session.timeRemaining)} remaining
                </p>
                </div>
            </div>
          {isTimerRunning == true ? null : <div className="row mb-2" style={pausedPrompt}><h2 id="paused-prompt">PAUSED</h2></div>}
            </div>
            </>
        )
        } else {
            return null;
        }
}

export default SessionLabel