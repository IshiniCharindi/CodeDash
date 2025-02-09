import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Navbar/Footer.jsx";
import "../EasySection/Keyboard.css";

const MediumSection = () => {
    const [snippets, setSnippets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
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
        axios.get("http://localhost/CodeDash/Backend/Controllers/MediumCodeSnippetViewController.php")
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
        setCompletionTimes([...completionTimes, elapsedTime]);

        if (userInput.trim() === snippets[currentIndex].code_snippet.trim()) {
            setFeedbackMessage("Successfully finished!");

            axios.get("http://localhost/CodeDash/Backend/Controllers/MediumCodeSnippetViewController.php")
                .then(response => {
                    setDbAverageTime(response.data.average_time);
                    if (elapsedTime < response.data.average_time) {
                        setFeedbackMessage("Your speed is good!");
                    } else {
                        setFeedbackMessage("Try to improve your speed.");
                    }
                })
                .catch(error => console.error("Error fetching average time:", error));
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
    const handlePreviousSnippet = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
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
        <div className="min-h-screen bg-gradient-to-br from-[#1B263B] to-[#1B263B] text-[#EFF6E0]">
            <div className="fixed inset-0 bg-[#01161E] opacity-30 bg-[radial-gradient(circle_at_1px_1px,#124559_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none"></div>
            <Navbar />
            <main className="max-w-7xl mx-auto p-6">
                <div className="text-center text-4xl text-white mb-8">
                    <h1>Time Spent: {elapsedTime} sec</h1>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : snippets.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="backdrop-blur-md bg-[#01161E]/60 p-6 rounded-xl border border-[#124559]/50">
                                <h2 className="text-xl font-semibold mb-4">Sample Code</h2>
                                <pre className="bg-[#01161E]/80 p-4 rounded-lg overflow-x-auto border border-[#124559]/50">
                                    <code className="text-sm font-mono text-[#EFF6E0]">
                                        {snippets[currentIndex].code_snippet}
                                    </code>
                                </pre>
                            </div>
                            <div className="backdrop-blur-md bg-[#01161E]/60 p-6 rounded-xl border border-[#124559]/50">
                                <h2 className="text-xl font-semibold mb-4">Your Code</h2>
                                <textarea
                                    value={userInput}
                                    onChange={handleInputChange}
                                    className="w-full h-[200px] bg-[#01161E]/80 p-4 rounded-lg text-[#EFF6E0] border border-[#124559]/50 focus:border-[#598392] transition-colors font-mono resize-none mb-4"
                                    placeholder="Start typing here..."
                                />
                                <div className="flex justify-end">
                                    <button onClick={handleSubmit} className="px-6 py-2 bg-[#124559] hover:bg-[#598392] text-white rounded-lg transition-colors backdrop-blur-sm">
                                        Submit
                                    </button>
                                </div>
                                {error && <p className="text-red-500 mb-4">{error}</p>}
                                {feedbackMessage && <p className="text-green-500 mt-4">{feedbackMessage}</p>}
                            </div>
                        </div>


                            <div className="flex justify-between mt-6">
                                <button onClick={handlePreviousSnippet} disabled={currentIndex === 0} className={`px-6 py-3 rounded-lg transition-colors backdrop-blur-sm ${currentIndex === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-[#598392] hover:bg-[#124559] text-white"}`}>
                                    Back
                                </button>
                                {currentIndex + 1 < snippets.length ? (
                                    <button onClick={handleNextSnippet} className="px-8 py-3 bg-[#598392] hover:bg-[#124559] text-white rounded-lg transition-colors backdrop-blur-sm">
                                        Next Question
                                    </button>
                                ) : (
                                    <div>
                                        <h3>Average Completion Time: {averageCompletionTime} seconds</h3>
                                        <a href="/medium">
                                            <button className="px-4 bg-[#598392] hover:bg-[#124559] text-white rounded-lg transition-colors backdrop-blur-sm">Move to Difficult Section</button>
                                        </a>
                                    </div>)}
                            </div>

                    </div>
                ) : (
                    <p>No snippets found.</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default MediumSection;
