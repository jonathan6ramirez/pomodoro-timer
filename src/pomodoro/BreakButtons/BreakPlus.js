import React from "react";

function BreakPlus ({session, handleBreakIncrease}) {
    if(session) {
        return (
            <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
                disabled={true}
            >
                <span className="oi oi-plus" />
            </button>
        )
    } else {
        return (
            <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
                onClick={() => handleBreakIncrease("breakDuration")}
            >
                <span className="oi oi-plus" />
            </button>
        )
    }
}

export default BreakPlus