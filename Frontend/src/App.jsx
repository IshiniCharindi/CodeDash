import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from "./Components/UserDashboard/UserDashboard.jsx";
import HomePage from "./Components/Home/HomePage.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import PracticePage from './Components/Home/PracticePage.jsx';

function App() {
  return (
     
    <> 
    <div className="min-h-screen bg-gradient-to-br from-[#1B263B] to-[#1B263B] text-[#EFF6E0]">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-[#01161E] opacity-30 bg-[radial-gradient(circle_at_1px_1px,#124559_1px,transparent_0)] bg-[size:40px_40px] pointer-events-none"></div>
        <Navbar />
       
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/practice" element={<PracticePage />} />
        </Routes>
        
       </div>
    </>
    
  );
}

export default App;
