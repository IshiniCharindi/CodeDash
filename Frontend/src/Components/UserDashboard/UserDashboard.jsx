import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import CodeSnippetList from './CodeSnippetList';
import AddSnippetModal from './AddSnippetModal';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import axios from "axios";

const UserDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [snippets, setSnippets] = useState([]);
    const [stats, setStats] = useState({
        wpm: 0,
        comment: 'Calculating...',
    });

    // Fetch user's code snippets on component load
    useEffect(() => {
        const userId = 1;  // Make sure to use the correct userId if necessary
        axios.get(`http://localhost/CodeDash/Backend/Controllers/UserSnippetsController.php?user_id=${userId}`)
            .then(response => {
                if (typeof response.data === "string") {
                    console.error("Invalid JSON response:", response.data);
                    return;
                }

                // Assuming the response has a data array with snippets
                setSnippets(response.data.snippets || []);
            })
            .catch(error => {
                if (error.response) {
                    console.error(`Server responded with status ${error.response.status}:`, error.response.data);
                } else if (error.request) {
                    console.error("No response received from the server:", error.request);
                } else {
                    console.error("Axios error:", error.message);
                }
            });
    }, []);

    const addSnippet = (newSnippet) => {
        const userId = 1;
        console.log(newSnippet);
        axios.post('http://localhost/CodeDash/Backend/Controllers/UserAddedSnippetController.php',
            {
                user_id: userId,
                title: newSnippet.title,
                code: newSnippet.code,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log(response.data);
                if (response.data.status) {
                    setSnippets([...snippets, { id: Date.now(), ...newSnippet }]);
                    setShowModal(false);
                } else {
                    console.error(response.data.message);
                }
            })
            .catch(error => {
                console.error('Error adding snippet:', error);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B263B] to-[#1B263B] text-[#EFF6E0]">
            {/* Background Pattern */}
            <div className="fixed inset-0 bg-[#01161E] opacity-30 bg-[radial-gradient(circle_at_1px_1px,#124559_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none"></div>

            {/* Header */}
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto p-10 relative">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 mb-8">
                    <div className="space-y-8">
                        <StatCard title="Comment" value={stats.comment} />
                    </div>
                    <div className="space-y-8">
                        <StatCard title="Typing Speed" value={stats.wpm} unit="WPM" />
                    </div>
                </div>

                {/* Code Snippets Section */}
                <div className="backdrop-blur-md bg-[#01161E]/40 rounded-xl border border-[#124559]/50 p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">My Code Snippets</h2>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-[#415A77] hover:bg-[#778DA9] text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm shadow-lg"
                        >
                            Add New Snippet
                        </button>
                    </div>
                    <CodeSnippetList snippets={snippets} />
                </div>
            </main>

            {/* Add Snippet Modal */}
            {showModal && (
                <AddSnippetModal onClose={() => setShowModal(false)} onAdd={addSnippet} />
            )}

            <Footer />
        </div>
    );
};

export default UserDashboard;
