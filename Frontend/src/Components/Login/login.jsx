import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/CodeDash/Backend/Controllers/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (data.status) {
        localStorage.setItem("username", JSON.stringify({ username }));

        alert("Login successful");
        if (username.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }

      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0E1DD]">
      <div className="w-full max-w-md bg-[#1B263B] p-8 rounded-lg shadow-xl">
        {/* Logo and Title */}
        <div className="text-center mb-8 mt-12">
          <h1 className="text-3xl font-bold text-[#E0E1DD]">CodeDash</h1>
          <p className="text-[#778DA9] mt-2">Typing Speed Improvement Platform for Coders</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#E0E1DD] mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-md bg-[#415A77] text-[#E0E1DD] placeholder-[#778DA9] border border-[#778DA9] focus:outline-none focus:border-[#E0E1DD] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-[#E0E1DD] text-[#1B263B] rounded-md font-extrabold text-xl hover:bg-[#778DA9] transition-colors mt-6"
          >
            Log In
          </button>
          <div className="text-center mt-4">
            <p className="text-[#778DA9]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#E0E1DD] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
