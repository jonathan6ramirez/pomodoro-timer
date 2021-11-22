import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import InSession from "./focus-and-bar/InSession";
import { minutesToDuration } from "../utils/duration";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration["breakDuration"] * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration["focusDuration"] * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState({"focusDuration": 25});
  const [breakDuration, setBreakDuration] = useState({"breakDuration": 5});
  
  // Decrease and increase handlers for focus duration
  const handleFocusDecrease = (value) => {
    if (focusDuration["focusDuration"] <= 5) {
      return null;
    } else {
        setFocusDuration({
        ...focusDuration,
        [value]: focusDuration[value] - 5,
      });
    }
  };
  const handleFocusIncrease = (value) => {
    if (60 <= focusDuration["focusDuration"]){
      return null;
    } else {
      setFocusDuration({
        ...focusDuration,
        [value]: focusDuration[value] + 5,
      });
    }
  };

  // Decrease and increase handlers for break duration
  const handleBreakDecrease = (value) => {
    if (breakDuration["breakDuration"] <= 1){
      return null;
    } else {
      setBreakDuration({
        ...breakDuration,
        [value]: breakDuration[value] - 1,
      });
    }
  };
  const handleBreakIncrease = (value) => {
    if (15 <= breakDuration["breakDuration"]) {
      return null;
    } else {
      setBreakDuration({
        ...breakDuration,
        [value]: breakDuration[value] + 1,
      });
    }
  };
  
  // Reset the session
  const handleReset = ( ) => {
    setIsTimerRunning(false);
    setSession(null);  
  }

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration["focusDuration"] * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }


  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration["focusDuration"])}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              {session ? 
                <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
              >
                <span className="oi oi-minus" />
              </button> : 
              <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
              onClick={() => handleFocusDecrease("focusDuration")}
            >
              <span className="oi oi-minus" />
            </button>
              }
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              { session ? 
                <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
              >
                <span className="oi oi-plus" />
              </button> :
                <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={() => handleFocusIncrease("focusDuration")}
              >
                <span className="oi oi-plus" />
              </button>
              }
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration["breakDuration"])}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                { session ? 
                  <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                >
                  <span className="oi oi-minus" />
                </button> : 
                  <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={() => handleBreakDecrease("breakDuration")}
                >
                  <span className="oi oi-minus" />
                </button>
                }
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                { session ? 
                  <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                >
                  <span className="oi oi-plus" />
                </button> :
                  <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={() => handleBreakIncrease("breakDuration")}
                >
                  <span className="oi oi-plus" />
                </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <InSession session={session} 
      focusDuration={focusDuration} 
      breakDuration={breakDuration}
      isTimerRunning={isTimerRunning}/>
    </div>
  );
}

export default Pomodoro;
