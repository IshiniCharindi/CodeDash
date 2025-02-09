import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Keyboard.css";

const EasySection = () => {
    const [snippets, setSnippets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(() => {
        return parseInt(localStorage.getItem("currentIndex")) || 0;
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [completionTimes, setCompletionTimes] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [dbAverageTime, setDbAverageTime] = useState(null);

    useEffect(() => {
        axios.get("http://localhost/CodeDash/Backend/Controllers/EasyCodeSnippentViewController.php")
            .then((response) => {
                setSnippets(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching snippets:", error);
                setError("Failed to load code snippets.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let timer;
        if (timerRunning) {
            timer = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [timerRunning]);

    useEffect(() => {
        localStorage.setItem("currentIndex", currentIndex);
    }, [currentIndex]);

    const handleInputChange = (event) => {
        if (!startTime) {
            setStartTime(Date.now());
            setTimerRunning(true);
        }
        setUserInput(event.target.value);
        setError(null);
        setFeedbackMessage(null);
    };

    const handleSubmit = () => {
        setTimerRunning(false);
        console.log(`Snippet ${currentIndex + 1} time: ${elapsedTime} sec`);
        setCompletionTimes([...completionTimes, elapsedTime]);

        if (userInput.trim() === snippets[currentIndex].code_snippet.trim()) {
            setFeedbackMessage("Successfully finished!");

            axios.get("http://localhost/CodeDash/Backend/Controllers/EasyCodeSnippentViewController.php")
                .then(response => {
                    setDbAverageTime(response.data.average_time);
                    if (elapsedTime < response.data.average_time) {
                        setFeedbackMessage("Your speed is good!");
                    } else {
                        setFeedbackMessage("Try to improve your speed.");
                    }
                })
                .catch(error => console.error("Error fetching average time:", error));

            setTimeout(() => {
                // window.location.reload();
            }, 1000);
        } else {
            setError("Your input does not match the expected code snippet. Please try again.");
        }
    };

    const handleNextSnippet = () => {
        if (currentIndex + 1 < snippets.length) {
            setCurrentIndex(currentIndex + 1);
            setStartTime(null);
            setElapsedTime(0);
            setUserInput("");
            setTimerRunning(false);
            setError(null);
            setFeedbackMessage(null);
        }
    };

    const averageCompletionTime = completionTimes.length > 0
        ? (completionTimes.reduce((acc, time) => acc + time, 0) / completionTimes.length).toFixed(2)
        : 0;

    return (
        <div>
            <h2>Easy Code Snippets</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : snippets.length > 0 ? (
                <div>
                    <h3>Code Snippet</h3>
                    <pre>{snippets[currentIndex].code_snippet}</pre>
                    <textarea
                        placeholder="Type your answer here..."
                        value={userInput}
                        onChange={handleInputChange}
                    />
                    <p>Time Spent: {elapsedTime} sec</p>
                    <button onClick={handleSubmit}>Submit</button>
                    {feedbackMessage && <p style={{ color: "green" }}>{feedbackMessage}</p>}
                    {currentIndex + 1 < snippets.length ? (
                        <button onClick={handleNextSnippet}>Next Question</button>
                    ) : (
                        <div>
                            <h3>Average Completion Time: {averageCompletionTime} seconds</h3>
                            <a href="/medium" ><button>Move to Medium Section</button></a>
                        </div>
                    )}
                </div>
            ) : (
                <p>No snippets found.</p>
            )}
        </div>
    );
};

export default EasySection;
