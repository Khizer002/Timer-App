import { useState, useRef } from "react";
import "./Timer.css";

const Timer = () => {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = window.setInterval(() => {
      setTotalSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setTotalSeconds(0);
  };
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="parent">
      <div className="outer-container">
        <div className="inner-container">
          <div className="timer-display">
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
          <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
