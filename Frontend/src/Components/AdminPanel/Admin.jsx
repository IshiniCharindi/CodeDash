import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';

const CodeSubmissionPropTypes = {
    id: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    coderName: PropTypes.string.isRequired,
};

function Admin() {
    const [submissions] = useState([
        { id: 1, code: "function hello() { return 'Hello World!' }", coderName: "John Doe" },
        { id: 2, code: "const sum = (a,b) => a + b", coderName: "Jane Smith" },
    ]);

    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [showLevelModal, setShowLevelModal] = useState(false);
    const [averageTime, setAverageTime] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('easy');

    const handleAccept = (submission) => {
        setSelectedSubmission(submission);
        setShowLevelModal(true);
    };

    const handleReject = (submission) => {
        console.log('Rejected submission:', submission.id);
    };

    const handleViewCode = (submission) => {
        setSelectedSubmission(submission);
        setShowCodeModal(true);
    };

    const handleLevelSubmit = () => {
        console.log('Submission:', selectedSubmission?.id, 'Level:', selectedLevel, 'Time:', averageTime);
        setShowLevelModal(false);
        setAverageTime('');
        setSelectedLevel('easy');
    };

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-[#0D1B2A]">
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-[#415A77] rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-[#E0E1DD] mb-4">Code Submissions</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-[#E0E1DD]">
                                    <thead className="bg-[#1B263B]">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Coder</th>
                                        <th className="px-6 py-3 text-left">Code Preview</th>
                                        <th className="px-6 py-3 text-center">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {submissions.map((submission) => (
                                        <tr key={submission.id} className="border-b border-[#1B263B]">
                                            <td className="px-6 py-4">{submission.coderName}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleViewCode(submission)}
                                                    className="text-[#778DA9] hover:text-[#E0E1DD] underline"
                                                >
                                                    View Code
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleAccept(submission)}
                                                        className="px-4 py-2 bg-[#1B263B] text-[#E0E1DD] rounded hover:bg-[#0D1B2A] transition"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(submission)}
                                                        className="px-4 py-2 bg-amber-900 text-[#E0E1DD] rounded hover:bg-red-950 transition"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code View Modal */}
                {showCodeModal && selectedSubmission && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-[#415A77] rounded-lg max-w-2xl w-full">
                            <div className="flex justify-between items-center p-4 border-b border-[#1B263B]">
                                <h3 className="text-xl font-bold text-[#E0E1DD]">Code Review</h3>
                                <button
                                    onClick={() => setShowCodeModal(false)}
                                    className="text-[#E0E1DD] hover:text-[#778DA9]"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-4">
              <pre className="bg-[#1B263B] p-4 rounded text-[#E0E1DD] overflow-x-auto">
                {selectedSubmission.code}
              </pre>
                            </div>
                        </div>
                    </div>
                )}

                {/* Level Assignment Modal */}
                {showLevelModal && selectedSubmission && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-[#415A77] rounded-lg max-w-md w-full">
                            <div className="flex justify-between items-center p-4 border-b border-[#1B263B]">
                                <h3 className="text-xl font-bold text-[#E0E1DD]">Assign Level</h3>
                                <button
                                    onClick={() => setShowLevelModal(false)}
                                    className="text-[#E0E1DD] hover:text-[#778DA9]"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                <div>
                                    <label className="block text-[#E0E1DD] mb-2">Difficulty Level</label>
                                    <select
                                        value={selectedLevel}
                                        onChange={(e) => setSelectedLevel(e.target.value)}
                                        className="w-full p-2 rounded bg-[#1B263B] text-[#E0E1DD] border border-[#778DA9] focus:outline-none focus:border-[#E0E1DD]"
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[#E0E1DD] mb-2">Average Time (minutes)</label>
                                    <input
                                        type="number"
                                        value={averageTime}
                                        onChange={(e) => setAverageTime(e.target.value)}
                                        className="w-full p-2 rounded bg-[#1B263B] text-[#E0E1DD] border border-[#778DA9] focus:outline-none focus:border-[#E0E1DD]"
                                        placeholder="Enter time in minutes"
                                    />
                                </div>
                                <button
                                    onClick={handleLevelSubmit}
                                    className="w-full px-4 py-2 bg-[#1B263B] text-[#E0E1DD] rounded hover:bg-[#0D1B2A] transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

// Add PropTypes at the end before exporting
Admin.propTypes = {
    submissions: PropTypes.arrayOf(PropTypes.shape(CodeSubmissionPropTypes)),
};

export default Admin;