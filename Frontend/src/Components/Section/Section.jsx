import React, { useState, useEffect } from "react";
import "./Keyboard.css"; // Import CSS

const keyToFingerMap = {
    "q": "left-pinky", "a": "left-pinky", "z": "left-pinky",
    "w": "left-ring", "s": "left-ring", "x": "left-ring",
    "e": "left-middle", "d": "left-middle", "c": "left-middle",
    "r": "left-index", "f": "left-index", "v": "left-index", "t": "left-index", "g": "left-index", "b": "left-index",
    "y": "right-index", "h": "right-index", "n": "right-index", "u": "right-index", "j": "right-index", "m": "right-index",
    "i": "right-middle", "k": "right-middle",
    "o": "right-ring", "l": "right-ring",
    "p": "right-pinky"
};

const Section = ({ codeSnippet }) => {
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(null);
    const [activeKey, setActiveKey] = useState(null);
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        if (startTime && !elapsedTime) {
            const interval = setInterval(() => {
                const remainingTime = Math.max(0, 60 - Math.floor((Date.now() - startTime) / 1000));
                setCountdown(remainingTime);
                if (remainingTime === 0) {
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [startTime, elapsedTime]);

    const handleChange = (e) => {
        if (!startTime) setStartTime(Date.now());
        setUserInput(e.target.value);
    };

    const handleSubmit = () => {
        const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
        setElapsedTime(timeTaken);
        setCountdown(0);
        console.log("User Input:", userInput);
        console.log("Time Taken:", timeTaken, "seconds");
    };

    const handleKeyDown = (e) => {
        setActiveKey(e.key.toLowerCase());
    };

    const handleKeyUp = () => {
        setActiveKey(null);
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <div>
            <h1>Code Snippet</h1>
            <pre>{codeSnippet}</pre>
            <textarea value={userInput} onChange={handleChange} placeholder="Type the code here..." rows="5" cols="50" />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {startTime && <p>Time Left: {countdown ? `${countdown} seconds` : "Time's up!"}</p>}

            <div className="keyboard-container">
                <div className="keyboard">
                    {"qwertyuiopasdfghjklzxcvbnm".split("").map((key) => (
                        <div key={key} className={`key ${activeKey === key ? "active" : ""}`}>
                            <img src={`images/${keyToFingerMap[key]}.png`} alt={`${keyToFingerMap[key]} finger`} className="finger-image" />
                            {key.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Section;
