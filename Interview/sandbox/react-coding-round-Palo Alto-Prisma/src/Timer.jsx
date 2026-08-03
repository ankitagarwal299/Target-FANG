import { useState, useEffect } from "react";

const KEY = "timer-storage";

function saveData(time) {
  try {
    localStorage.setItem(KEY, JSON.stringify(time));
  } catch (e) {
    console.error("Failed to save:", e);
  }
}

function getData() {
  try {
    const res = localStorage.getItem(KEY);
    return res ? JSON.parse(res) : 0;
  } catch {
    return 0;
  }
}

function delItem() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    console.error("Failed to delete:", e);
  }
}

export default function Timer() {
  const [time, setTime] = useState(() => getData());
  const [running, setRunning] = useState(true);

  useEffect(() => {
    // if (!running) return;
    const timerId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (!running) return;
    saveData(time);
  }, [time, running]);

  const handleDelete = () => {
    setRunning(false)
    delItem();
    setTime(0); // reset UI so you see the effect
  };

  return (
    <>
      <h1>Timer Page</h1>
      <p>Timer is running: {time} seconds</p>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}