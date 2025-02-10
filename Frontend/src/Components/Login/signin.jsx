import { useState } from 'react'
import { Link } from "react-router-dom";

function Signin() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const response = await fetch("http://localhost/CodeDash/Backend/Controllers/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
    });
  
    const data = await response.json();
    alert(data.message);
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0E1DD]">
      <div className="w-full max-w-md bg-[#1B263B] p-8 rounded-lg shadow-xl">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#E0E1DD]">CodeDash</h1>
          <p className="text-[#778DA9] mt-2 mb-1">Create Your Account</p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#E0E1DD] mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2 rounded-md bg-[#415A77] text-[#E0E1DD] placeholder-[#778DA9] border border-[#778DA9] focus:outline-none focus:border-[#E0E1DD] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#E0E1DD] mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              className="w-full px-4 py-2 rounded-md bg-[#415A77] text-[#E0E1DD] placeholder-[#778DA9] border border-[#778DA9] focus:outline-none focus:border-[#E0E1DD] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#E0E1DD] mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-md bg-[#415A77] text-[#E0E1DD] placeholder-[#778DA9] border border-[#778DA9] focus:outline-none focus:border-[#E0E1DD] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#E0E1DD] mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full px-4 py-2 rounded-md bg-[#415A77] text-[#E0E1DD] placeholder-[#778DA9] border border-[#778DA9] focus:outline-none focus:border-[#E0E1DD] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#E0E1DD] mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
              className="w-full px-4 py-2 rounded-md bg-[#415A77] text-[#E0E1DD] placeholder-[#778DA9] border border-[#778DA9] focus:outline-none focus:border-[#E0E1DD] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-[#1B263B] bg-[#E0E1DD] rounded-md font-medium hover:bg-[#778DA9] transition-colors mt-6"
          >
            Create Account
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-4">
          <p className="text-[#778DA9]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#E0E1DD] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin