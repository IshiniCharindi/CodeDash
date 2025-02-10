import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

function Navbar({ username }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/login');
    };
    return (
        <nav className="bg-[#01161E]/80 border-b border-[#124559]/50 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center">
                            <img
                                src="../src/images/logo.png"
                                alt="Logo"
                                className="h-12 w-40 "
                            />
                        </Link>
                        <div className="flex space-x-4">
                            <Link
                                to="/home"
                                className="text-[#E0E1DD] hover:text-[#778DA9] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                to="/dashboard"
                                className="text-[#E0E1DD] hover:text-[#778DA9] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>


                    <div className="flex items-center space-x-4">
            <span className="text-[#E0E1DD] text-sm">
              Welcome, <span className="font-medium">{username}</span>
            </span>
                        <button
                            onClick={handleLogout}
                            className="bg-[#415A77]/80 backdrop-blur-sm text-[#E0E1DD] hover:bg-[#778DA9] px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;