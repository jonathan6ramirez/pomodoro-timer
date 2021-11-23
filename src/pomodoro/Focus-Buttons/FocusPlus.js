import React from "react";
import FocusMinus from "./FocusMinus";

function FocusPlus ({session, handleFocusIncrease}) {
    if(session) {
        return (
            <button
        type="button"
        className="btn btn-secondary"
        data-testid="increase-focus"
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
        data-testid="increase-focus"
        onClick={() => handleFocusIncrease("focusDuration")}
      >
        <span className="oi oi-plus" />
      </button>
        )
    }
}

export default FocusPlus