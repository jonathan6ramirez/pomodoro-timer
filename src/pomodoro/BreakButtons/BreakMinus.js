import React from "react";

function BreakMinus ({session, handleBreakDecrease}) {
    if (session) {
        return (
            <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
            >
                <span className="oi oi-minus" />
            </button>
        )
    } else {
        return (
            <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
                onClick={() => handleBreakDecrease("breakDuration")}
            >
                <span className="oi oi-minus" />
            </button>
        )
    }
}

export default BreakMinus