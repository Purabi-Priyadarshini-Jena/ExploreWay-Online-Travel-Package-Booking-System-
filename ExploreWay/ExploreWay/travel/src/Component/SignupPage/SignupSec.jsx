import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import simg from "../../assets/signupnew.jpg";
import bg from "../../assets/bg.webp";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "User", // Fixed to 'User'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const validateForm = () => {
    const nameRegex = /^[A-Za-z][A-Za-z\s]{4,}$/;
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(formData.name)) {
      setError("Name must be at least 5 letters, start with a letter, and contain only alphabets and spaces.");
      toast.error("Invalid name format.");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Email must start with a letter and end with @gmail.com.");
      toast.error("Invalid email format.");
      return false;
    }

    if (!mobileRegex.test(formData.mobile)) {
      setError("Mobile number must be exactly 10 digits.");
      toast.error("Invalid mobile number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9009/api/v1/users/",
        formData
      );

      toast.success("Signup successful! Redirecting...");

      localStorage.setItem("token", response.data.token);
      const decodedToken = jwtDecode(response.data.token);
      localStorage.setItem("role", decodedToken.role);

      if (decodedToken.role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-md opacity-190"
      />

     <div className="relative bg-green-100 shadow-2xl rounded-lg p-5 mt-12 sm:p-6 md:p-4 flex flex-col lg:flex-row items-center w-full max-w-[800px]">
  <div className="w-full lg:w-1/2 h-56 sm:h-64 md:h-72 lg:h-[28rem] flex justify-center">
    <img
      src={simg}
      alt="Signup"
      className="w-full h-full object-cover rounded-lg shadow-md"
    />
  </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 mt-6 lg:mt-0">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <p className="text-2xl font-bold text-center hover:scale-110 transition-all duration-500 ease-in-out">
              Hello👋 New User
            </p>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className=" p-3 rounded-md text-lg border-black border-2"
              onChange={handleChange}
              value={formData.name}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className=" p-3 rounded-md text-lg border-black border-2"
              onChange={handleChange}
              value={formData.email}
              required
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              className=" p-3 rounded-md text-lg border-black border-2"
              onChange={handleChange}
              value={formData.mobile}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-3 rounded-md text-lg border-black border-2"
              onChange={handleChange}
              value={formData.password}
              required
            />

            {/* Removed role selection dropdown */}

            <button
              type="submit"
              className="bg-green-700 text-white font-bold py-2 rounded-md hover:bg-red-800 transition"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="text-center">
              <p>Or</p>
              <Link
                to="/login"
                className="block w-full bg-green-700 text-white font-semibold py-2 rounded-md hover:bg-red-800 hover:text-white transition"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
