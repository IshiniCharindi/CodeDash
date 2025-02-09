import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Navbar/Footer.jsx";

const difficultyLevels = [
    {
        title: 'Easy',
        description: 'Perfect for beginners. Basic syntax & common programming structures.',
        color: 'from-green-500/20 to-green-600/20',
        border: 'border-green-500/30',
        hover: 'hover:border-green-500/50',
        details: [
            'Short lines with minimal special characters',
            'Minimal indentation and spacing',
            'Basic keywords, no complex operators',
            'Lower hand movement across the keyboard',
            'Goal: Improve speed and accuracy in typing basic code structures'
        ],
        link: '/easy'
    },
    {
        title: 'Medium',
        description: 'Moderate increase in typing difficulty with more hand movement and symbol usage',
        color: 'from-yellow-500/20 to-yellow-600/20',
        border: 'border-yellow-500/30',
        hover: 'hover:border-yellow-500/50',
        details: [
            'More indentation, requiring hand movement',
            'Increased use of symbols ({}, [], <>, +=, -=, ==)',
            'Longer variable names and function calls',
            'Combination of uppercase and lowercase characters',
            'Goal: Improve speed in handling moderate complexity with symbols'
        ],
        link: '/medium'
    },
    {
        title: 'Hard',
        description: 'High typing difficulty with complex character combinations.',
        color: 'from-red-500/20 to-red-600/20',
        border: 'border-red-500/30',
        hover: 'hover:border-red-500/50',
        details: [
            'Frequent use of special characters (<>, ->, ::, &, *, \, |)',
            'Multi-line expressions requiring fast switching between keys',
            'Deep indentation and mixed casing (CamelCase, snake_case)',
            'Complex key sequences that require precision',
            'Goal: Master high-speed, accurate typing for challenging syntax'
        ],
        link: '/difficult'
    }
];

function DifficultyCard({ level }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className={`backdrop-blur-md bg-gradient-to-br ${level.color} p-6 rounded-xl border ${level.border} ${level.hover} transition-all duration-300 hover:shadow-xl`}>
            <h3 className="text-2xl font-bold mb-3">{level.title}</h3>
            <p className="text-[#AEC3B0] mb-4">{level.description}</p>

            <div className="space-y-4">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-[#598392] hover:text-[#EFF6E0] transition-colors"
                >
                    {showDetails ? 'Show Less' : 'Read More'}
                </button>

                {showDetails && (
                    <ul className="list-disc list-inside text-[#AEC3B0] space-y-2">
                        {level.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                )}

                <Link
                    to={level.link}
                    className="block w-full text-center bg-[#124559] hover:bg-[#598392] text-white px-4 py-2 rounded-lg transition-colors mt-4"
                >
                    Start Practice
                </Link>
            </div>
        </div>
    );
}

function Home() {
    return (
        <>
            <div className="bg-gradient-to-br from-[#1B263B] to-[#1B263B] text-[#EFF6E0]">
                <Navbar/>
                <main className="max-w-7xl mx-auto p-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Improve Your Coding Speed</h1>
                        <p className="text-[#AEC3B0] text-lg">Choose your difficulty level and start practicing</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {difficultyLevels.map((level) => (
                            <DifficultyCard key={level.title} level={level} />
                        ))}
                    </div>
                </main>
                <Footer/>
            </div>

        </>


    );
}

export default Home;
