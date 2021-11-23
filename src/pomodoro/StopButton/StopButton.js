import React from "react";

function StopButton ({session, handleReset}) {
    console.log("---this is the type of----",handleReset)
    return (
        <>
        {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            {!session ? 
                <button
                type="button"
                className="btn btn-secondary"
                data-testid="stop"
                title="Stop the session"
                disabled={true}
              >
                <span className="oi oi-media-stop" />
              </button> : 
                <button
                type="button"
                className="btn btn-secondary"
                data-testid="stop"
                title="Stop the session"
                onClick={() => handleReset()}
              >
                <span className="oi oi-media-stop" />
              </button>
              }
        </>
    )
}
export default StopButton;