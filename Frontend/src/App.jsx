import './App.css'
import Home from "./Components/Home/Home.jsx";
import logo from "../src/images/logo.png"
import {Link} from "react-router-dom";
function App() {


  return (
    <>
      <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#1B263B] to-[#1B263B] text-[#EFF6E0]">
        <div className="flex justify-center">
          <img src={logo} alt=""/>
        </div>
        <div className="text-center mt-4">

          <Link to="/signup" className="text-[#E0E1DD] hover:underline">
            <button
                type="submit"
                className="w-50 py-3 px-6 bg-[#E0E1DD] text-[#1B263B] rounded-md font-extrabold text-xl hover:bg-[#778DA9] transition-colors mt-6"
            >Sign up
            </button>
          </Link>
        </div>
        <div className="text-center mt-4">
          <Link to="/login" className="text-[#E0E1DD] hover:underline">
            <button
                type="submit"
                className="w-50 py-3 px-6 bg-[#E0E1DD] text-[#1B263B] rounded-md font-extrabold text-xl hover:bg-[#778DA9] transition-colors mt-6"
            >Login
            </button>
          </Link>
        </div>
      </div>
    {/*<Home/>*/}
    </>
  )
}

export default App
