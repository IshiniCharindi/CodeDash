import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Keyboard.css";

const EasySection = () => {
    const [snippets, setSnippets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(parseInt(localStorage.getItem("currentIndex")) || 0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [averageTime, setAverageTime] = useState(null);

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
        axios.get("http://localhost/CodeDash/Backend/Controllers/EasyCodeSnippentViewController.php")
            .then(response => {
                setAverageTime(response.data.average_time);
            })
            .catch(error => {
                console.error("Error fetching average time:", error);
            });
    }, []);

    const handleInputChange = (event) => {
        if (!startTime) {
            setStartTime(Date.now());
            setTimerRunning(true);
        }
        setUserInput(event.target.value);
        setError(null); 
        setFeedbackMessage("");
    };

    const handleSubmit = () => {
        setTimerRunning(false);
        const expectedSnippet = snippets[currentIndex].code_snippet.trim();
        const userSnippet = userInput.trim();

        if (userSnippet === expectedSnippet) {
            console.log(`Snippet ${currentIndex + 1} time: ${elapsedTime} sec`);
            localStorage.setItem("currentIndex", currentIndex + 1);
            window.location.reload();
        } else {
            setError("Incorrect code! Please try again.");
        }

        if (averageTime !== null) {
            if (elapsedTime < averageTime) {
                setFeedbackMessage("Your speed is good!");
            } else {
                setFeedbackMessage("Try to improve your speed.");
            }
        }
    };

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
                </div>
            ) : (
                <p>No snippets found.</p>
            )}
        </div>
    );
};

export default EasySection;
