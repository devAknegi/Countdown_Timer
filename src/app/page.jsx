"use client";
import React, { useState, useEffect } from "react";
import "../../public/pause.svg";
import "../../public/play.svg";

const CountdownTimer = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [userMinutes, setUserMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const initialTime = userMinutes * 60 * 1000;
    setRemainingTime(initialTime);
  }, [userMinutes]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setRemainingTime(remainingTime - 1000);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [remainingTime, isRunning]);

  const handleCountdown = () => {
    const hours = Math.floor(remainingTime / (60 * 60 * 1000) || 0);
    const minutes = Math.floor((remainingTime / (60 * 1000)) % 60 || 0);
    const seconds = Math.floor((remainingTime / 1000) % 60 || 0);

    return `${hours.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handlePlay = () => {
    setIsRunning(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <label htmlFor="countdownInput" className="text-xl mb-2 block">
          Enter Countdown Time{" "}
          <span className="text-blue-500"> (in minutes) </span>:
        </label>
        <input
          type="number"
          min="1"
          defaultValue={0}
          placeholder="Enter minutes"
          className="p-2 w-80 border-2 border-gray-300 bg-transparent text-white rounded focus:outline-none focus:ring"
          onChange={(e) => setUserMinutes(parseInt(e.target.value))}
        />
        <br />
        <div className="my-5 flex items-center justify-center">
          {isRunning ? (
            <button onClick={handlePause} >
              <img src="pause.svg" alt="Pause Button" />
            </button>
          ) : (
            <button onClick={handlePlay}>
              <img src="play.svg" alt="Play Button" />
            </button>
          )}
          <div className="text-4xl text-blue-500 font-bold">
            {handleCountdown()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
