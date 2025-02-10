import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import axios from 'axios';

const CodeSubmissionPropTypes = {
    id: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    coderName: PropTypes.string.isRequired,
};

function Admin() {
    const [submissions, setSubmissions] = useState([]);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [showLevelModal, setShowLevelModal] = useState(false);
    const [averageTime, setAverageTime] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('easy');

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get('http://localhost/CodeDash/Backend/Controllers/GetPendingRecipiesController.php');
                console.log('API Response:', response.data);
                setSubmissions(response.data.snippets || []);
            } catch (error) {
                console.error('Error fetching submissions:', error);
                setSubmissions([]);
            }
        };

        fetchSubmissions();
    }, []);

    const handleAccept = (submission) => {
        setSelectedSubmission(submission);
        setShowLevelModal(true);
    };

    const handleReject = async (submission) => {
        const confirmReject = window.confirm('Are you sure you want to reject this submission?');
        if (confirmReject) {
            try {
                await axios.post('http://localhost/CodeDash/Backend/Controllers/UpdateStatusController.php', {
                    id: submission.id,
                    status: 'rejected',
                });
                setSubmissions(submissions.filter((s) => s.id !== submission.id));
            } catch (error) {
                console.error('Error rejecting submission:', error);
            }
        }
    };

    const handleViewCode = (submission) => {
        setSelectedSubmission(submission);
        setShowCodeModal(true);
    };

    const handleLevelSubmit = async () => {
        if (!selectedSubmission) return;

        try {
            await axios.post('http://localhost/CodeDash/Backend/Controllers/MoveToSnippetsController.php', {
                id: selectedSubmission.id,
                code: selectedSubmission.code,
                coderName: selectedSubmission.user_name,
                difficulty: selectedLevel,
                averageTime: averageTime,
            });

            setSubmissions(submissions.filter((s) => s.id !== selectedSubmission.id));
            setShowLevelModal(false);
            setAverageTime('');
            setSelectedLevel('easy');
        } catch (error) {
            console.error('Error moving submission:', error);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-[#0D1B2A]">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl text-center font-bold text-[#E0E1DD] mt-2 mb-5">Admin Dashboard</h1>
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
                                            <td className="px-6 py-4">{submission.user_name}</td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleViewCode(submission)}
                                                        className="text-[#778DA9] hover:text-[#E0E1DD] underline">
                                                    View Code
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button onClick={() => handleAccept(submission)}
                                                            className="px-4 py-2 bg-[#1B263B] text-[#E0E1DD] rounded hover:bg-[#0D1B2A] transition">
                                                        Accept
                                                    </button>
                                                    <button onClick={() => handleReject(submission)}
                                                            className="px-4 py-2 bg-amber-900 text-[#E0E1DD] rounded hover:bg-red-950 transition">
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

                <Footer />
            </div>
        </div>
    );
}

Admin.propTypes = {
    submissions: PropTypes.arrayOf(PropTypes.shape(CodeSubmissionPropTypes)),
};

export default Admin;
