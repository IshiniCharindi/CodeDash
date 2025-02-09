import React,{ useState } from 'react';

import StatCard from './StatCard';
import CodeSnippetList from './CodeSnippetList';
import AddSnippetModal from './AddSnippetModal';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';

const UserDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [snippets, setSnippets] = useState([
      { id: 1, title: 'React Component', code: 'function Component() {\n  return <div>Hello</div>\n}' },
      { id: 2, title: 'Array Map', code: 'const newArray = array.map(item => item * 2);' }
    ]);

    const stats = {
        wpm: 75,
        accuracy: 98,
        comment: 'Average',
        practiceTime: '2.5',
        streakDays: 7,
        totalExercises: 124
      };
      const addSnippet = (newSnippet) => {
        setSnippets([...snippets, { id: Date.now(), ...newSnippet }]);
        setShowModal(false);
      };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B263B] to-[#1B263B] text-[#EFF6E0] ">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[#01161E] opacity-30 bg-[radial-gradient(circle_at_1px_1px,#124559_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Header */}

      <Navbar/>

      {/* <header className="sticky top-0 z-10 backdrop-blur-md bg-[#01161E]/80 border-b border-[#124559]/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <img src="../src/images/logo.png" alt="Logo" className="w-40 h-12" />
          <div className="flex items-center gap-4">
            <span className="text-[#AEC3B0]">Welcome, John Doe</span>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              alt="profile"
              className="w-10 h-10 rounded-full ring-2 ring-[#124559]"
            />
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-10 relative">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-8 mb-8">

          <StatCard title="Comment" value={stats.comment}  />
          {/* <StatCard title="Accuracy" value={stats.accuracy} unit="%" /> */}
           <StatCard title="Typing Speed" value={stats.wpm} unit="WPM" />
          <StatCard title="Practice Time" value={stats.practiceTime} unit="hours" />
          
          {/* <StatCard title="Exercises" value={stats.totalExercises} unit="total" /> */}
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

      <Footer/>
    </div>
    );
};

export default UserDashboard;