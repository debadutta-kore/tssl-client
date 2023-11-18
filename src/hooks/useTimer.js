import { useCallback } from 'react';
import { useState, useEffect } from 'react';

function useTimer() {
    const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000); // Update the timer every second
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning]);

  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
  },[]);

  const stopTimer = useCallback(() => {
    setIsTimerRunning(false);
    setTimer(0); // Reset the timer to 0 when stopping
  },[]);

  return {
    timer,
    startTimer,
    stopTimer,
  };
}

export default useTimer;
