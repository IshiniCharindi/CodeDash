import React, { useState } from 'react';
import { Medal, Trophy } from 'lucide-react';
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Navbar/Footer.jsx";

const leaderboardData = [
    { id: 1, name: 'Mala', score: 150, initials: 'PI' },
    { id: 2, name: 'Sunil', score: 100, initials: 'SU' },
    { id: 3, name: 'Kamal', score: 80, initials: 'TU' },
    { id: 4, name: 'Amal', score: 70, initials: 'TA' },
    { id: 5, name: 'Pathum', score: 50, initials: 'PA' },
    { id: 6, name: 'Gayan', score: 20, initials: 'SK' },
    { id: 7, name: 'Anil', score: 10, initials: 'AN' },
    { id: 8, name: 'Sumith', score: 10, initials: 'AN' },
    { id: 9, name: 'John ', score: 5, initials: 'JD' },
    { id: 10, name: 'Mahinda', score: 5, initials: 'JS' },
];

const TimeFilter = ['Weekly', 'Monthly', 'All Time'];

function Leaderboard() {
    const [timeFilter, setTimeFilter] = useState('All Time');
    const top3 = leaderboardData.slice(0, 3);

    return (
        <div className="leaderboard bg-[#0D1B2A]">
            <Navbar/>
            <div className="min-h-screen bg-[#0D1B2A] text-white p-4 md:p-8">

                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-4 text-[#E0E1DD]">LEADERBOARD</h1>
                    <h2 className="text-xl text-center mb-8 text-[#40A77B]">LAST 3 WINNERS</h2>

                    {/* Top 3 Winners */}
                    <div className="flex justify-center gap-4 mb-12">
                        {/* Second Place */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-[#778DA9] flex items-center justify-center mb-2">
                                <Trophy className="w-10 h-10 text-white" />
                            </div>
                            <span className="font-semibold">{top3[1].name}</span>
                            <span className="bg-[#40A77B] px-4 py-1 rounded-full mt-2">{top3[1].score}</span>
                        </div>

                        {/* First Place */}
                        <div className="flex flex-col items-center -mt-4">
                            <div className="w-24 h-24 rounded-full bg-[#FFA500] flex items-center justify-center mb-2">
                                <Trophy className="w-12 h-12 text-white" />
                            </div>
                            <span className="font-semibold">{top3[0].name}</span>
                            <span className="bg-[#40A77B] px-4 py-1 rounded-full mt-2">{top3[0].score}</span>
                        </div>

                        {/* Third Place */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-[#CD7F32] flex items-center justify-center mb-2">
                                <Trophy className="w-10 h-10 text-white" />
                            </div>
                            <span className="font-semibold">{top3[2].name}</span>
                            <span className="bg-[#40A77B] px-4 py-1 rounded-full mt-2">{top3[2].score}</span>
                        </div>
                    </div>

                    {/* Time Filter */}
                    <div className="flex justify-center gap-4 mb-8 bg-[#1B263B] rounded-full p-1">
                        {TimeFilter.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setTimeFilter(filter)}
                                className={`px-6 py-2 rounded-full transition-colors ${
                                    timeFilter === filter ? 'bg-[#40A77B] text-white' : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Leaderboard List */}
                    <div className="space-y-4">
                        {leaderboardData.map((player) => (
                            <div
                                key={player.id}
                                className="bg-[#1B263B] rounded-lg p-4 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-xl font-semibold w-8">{player.id}</span>
                                    <div className="w-12 h-12 rounded-full bg-[#40A77B] flex items-center justify-center">
                                        <span className="text-white font-semibold">{player.initials}</span>
                                    </div>
                                    <span className="font-semibold">{player.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    {player.id <= 3 && (
                                        <Medal className={`w-6 h-6 ${
                                            player.id === 1 ? 'text-[#FFA500]' :
                                                player.id === 2 ? 'text-[#778DA9]' :
                                                    'text-[#CD7F32]'
                                        }`} />
                                    )}
                                    <span className="bg-[#40A77B] px-4 py-1 rounded-full">{player.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    );
}

export default Leaderboard;