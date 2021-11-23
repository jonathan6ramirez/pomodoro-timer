import React from "react";

function FocusMinus ({session, handleFocusDecrease}) {
    if (session) {
        return (
            <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                disabled={true}
              >
                <span className="oi oi-minus" />
            </button>
        )
    } else {
        return (
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
              onClick={() => handleFocusDecrease("focusDuration")}
            >
              <span className="oi oi-minus" />
        </button>
        )
    }
}

export default FocusMinus