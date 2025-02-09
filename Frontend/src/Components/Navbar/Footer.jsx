import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-[#01161E]/80 backdrop-blur-md text-[#E0E1DD]">
            <div className="max-w-7xl mx-auto px-8 py-8 gap-x-8 ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    <Link to="/practice" className="flex items-center ml-20">
                        <img
                            src="../src/images/logo.png"
                            alt="Logo"
                            className="h-12 w-40 "
                        />
                    </Link>
                    {/* Contact Information */}
                    <div className='ml-20'>
                        <h3 className="text-lg font-semibold mb-4 ">Contact Us</h3>
                        <div className="space-y-2">
                            <p className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>(+94)11 123-4567</span>
                            </p>
                            <p className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:example@example.com">codedash@gmail.com</a>
                            </p>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className='ml-40'>
                        <h3 className="text-lg font-semibold mb-4 ">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#778DA9] transition-colors duration-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                </svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#778DA9] transition-colors duration-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Additional Links or Information */}

                </div>

                {/* Copyright */}
                <div className="border-t border-[#415A77] mt-8 pt-8 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} CodeDash. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;