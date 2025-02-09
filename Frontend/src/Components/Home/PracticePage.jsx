import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Stopwatch({ onFinish, shouldStop }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [finishedTime, setFinishedTime] = useState(null);

  useEffect(() => {
    let intervalId;
    if (isRunning && !shouldStop) {
      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
    if (shouldStop && isRunning) {
      setIsRunning(false);
      setFinishedTime(time);
      if (onFinish) {
        onFinish(time);
      }
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time, shouldStop, onFinish]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    
    
        
    <div className="space-y-2">
      <div className="text-4xl font-mono mb-2">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      {finishedTime && (
        <div className="text-[#AEC3B0] text-sm">
          Finished in: {Math.floor(finishedTime / 60)}m {finishedTime % 60}s
        </div>
      )}
    </div>
    
  );
}

function PracticePage() {
  const { difficulty } = useParams();
  const [userCode, setUserCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldStopTimer, setShouldStopTimer] = useState(false);
  
  const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShouldStopTimer(true);
  };

  const handleNext = () => {
    setUserCode('');
    setIsSubmitted(false);
    setShouldStopTimer(false);
    // load the next question
  };

  const handleFinish = (time) => {
    // Handle the finished time
    console.log('Finished in:', time, 'seconds');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B263B] to-[#1B263B] text-[#EFF6E0]">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-[#01161E] opacity-30 bg-[radial-gradient(circle_at_1px_1px,#124559_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none"></div>
    <Navbar/>
    <main className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        
        <Stopwatch onFinish={handleFinish} shouldStop={shouldStopTimer} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Sample Code */}
        <div className="backdrop-blur-md bg-[#01161E]/60 p-6 rounded-xl border border-[#124559]/50">
          <h2 className="text-xl font-semibold mb-4">Sample Code</h2>
          <pre className="bg-[#01161E]/80 p-4 rounded-lg overflow-x-auto border border-[#124559]/50">
            <code className="text-sm font-mono text-[#EFF6E0]">
              {sampleCode}
            </code>
          </pre>
        </div>

        {/* User Input */}
        <div className="backdrop-blur-md bg-[#01161E]/60 p-6 rounded-xl border border-[#124559]/50">
          <h2 className="text-xl font-semibold mb-4">Your Code</h2>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-[200px] bg-[#01161E]/80 p-4 rounded-lg text-[#EFF6E0] border border-[#124559]/50 focus:border-[#598392] transition-colors font-mono resize-none mb-4"
            placeholder="Start typing here..."
            disabled={isSubmitted}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitted}
              className={`px-6 py-2 ${
                isSubmitted 
                  ? 'bg-[#124559]/50 cursor-not-allowed' 
                  : 'bg-[#124559] hover:bg-[#598392]'
              } text-white rounded-lg transition-colors backdrop-blur-sm`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Next Question Button (Below both panels) */}
      <div className="flex justify-center">
        <button
          onClick={handleNext}
          disabled={!isSubmitted}
          className={`px-8 py-3 ${
            !isSubmitted 
              ? 'bg-[#598392]/50 cursor-not-allowed' 
              : 'bg-[#598392] hover:bg-[#124559]'
          } text-white rounded-lg transition-colors backdrop-blur-sm`}
        >
          Next Question
        </button>
      </div>
    </main>
    </div>
  );
}

export default PracticePage;