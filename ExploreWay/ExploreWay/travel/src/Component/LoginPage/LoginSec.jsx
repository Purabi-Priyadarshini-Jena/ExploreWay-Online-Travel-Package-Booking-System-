import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import lg from "/src/assets/l.jpg";
import bg from "/src/assets/bg.webp";

const NewLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/;

    if (!emailRegex.test(email)) {
        setError("Invalid email format. Use a Gmail address starting with a letter.");
        toast.error("Invalid email format. Use a Gmail address starting with a letter.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:9009/api/v1/users/Login", {
            email,
            password,
        });

        if (response.data?.token) {
            const token = response.data.token;
            localStorage.setItem("token", token);

            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;
            localStorage.setItem("role", userRole);

            toast.success("Login successful! Welcome back!");

            if (userRole === "Admin") {
                navigate("/");
            } else {
                navigate("/");
            }
        } else {
            setError(response.data?.message || "Login failed");
            toast.error(response.data?.message || "Login failed!");
        }
    } catch (err) {
        setError("Invalid email or password");
        toast.error("Login failed. Please try again.");
    }
};


    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
            {/* Overlay blur */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

            {/* Login Card */}
           <div className="relative z-9 flex flex-col lg:flex-row bg-blue-200 rounded-lg shadow-xl p-5 sm:p-7 max-w-[850px] w-full mx-4 h-[500px] mt-12 lg:h-[500px]">

                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                    <img
                        src={lg}
                        alt="Login"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Form Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 mt-6 lg:mt-0">
                    <h2 className="text-2xl font-bold text-center mb-3">Welcome Back ✌️</h2>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="border-2 p-3 rounded-md text-lg border-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border-2 p-3 rounded-md text-lg border-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 text-white font-bold py-2 rounded-md hover:bg-red-800 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center font-normal text-lg mt-2">Or</p>
                    <Link to="/signup">
                        <button className="bg-gray-100 text-black font-semibold py-2 rounded-md hover:bg-red-800 hover:text-white transition w-full">
                            Create Account
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewLogin;
