import React from "react";
import { secondsToDuration, minutesToDuration } from "../../utils/duration";

function InSession ({session, focusDuration, breakDuration, isTimerRunning}) {
  //
  function calculatePercetage () {
    let currentSeconds = 0;
    session.label === "Focusing" ? currentSeconds = focusDuration["focusDuration"] : currentSeconds = breakDuration["breakDuration"]
    const seconds = currentSeconds * 60;
    let percentage = Math.round(((seconds - session.timeRemaining) / seconds) * 100);
    return percentage;
  }
  function calculateAriaValue () {
    let durationSeconds = 0;
    let ariaValue = 0;
    session.label === "Focusing" ? durationSeconds = focusDuration["focusDuration"] : durationSeconds = breakDuration["breakDuration"]
    const seconds = durationSeconds * 60;
    if (session.timeRemaining == seconds){
      return ariaValue;
    }
    else {
      ariaValue = (Math.round(((seconds - session.timeRemaining) / seconds) * 100));
      return ariaValue;
    }
  }
  const pausedPrompt = {
    display: "flex",
    justifyContent: "center",
  }
    if (session != null) {
        return (
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
            <div className="row mb-2">
              <div className="col">
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={calculateAriaValue()} // TODO: Increase aria-valuenow as elapsed time increases
                    style={{ width:  calculatePercetage() + "%" }} // TODO: Increase width % as elapsed time increases
                  />
                </div>
              </div>
            </div>
          </div>
        )
    } else {
        return null;
    }
    
}
export default InSession;