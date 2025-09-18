import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu, IoMdClose, IoMdPerson } from "react-icons/io";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [role, setRole] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setRole(decodedToken.role);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Invalid token:", error);
                handleLogout();
            }
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <header
            className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
                isScrolled
                    ? "bg-black/50 backdrop-blur-lg shadow-md"
                    : "bg-black/20 backdrop-blur-md"
            } text-white`}
        >
            <div className="w-full flex items-center justify-between px-9 py-7">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link
                        to={role === "Admin" ? "/" : "/"}
                        className="text-3xl font-extrabold tracking-widest drop-shadow-lg"
                    >
                        ExploreWay
                    </Link>
                </div>

                {/* Hamburger Menu */}
                <button
                    className="md:hidden text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <IoMdClose /> : <IoMdMenu />}
                </button>

                {/* Navigation Links */}
                <nav
                    className={`absolute md:static top-[70px] left-0 w-full md:w-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-12 px-6 py-6 md:p-0 text-xl font-medium transition-transform duration-300 ${
                        menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
                >
                    {role === "Admin" ? (
                        <>
                            <Link to="/" className="hover:underline hover:text-2xl"></Link>
                            <Link to="/member" className="hover:underline hover:text-2xl">About Us</Link>
                            <Link to="/admin-dashboard" className="hover:underline hover:text-2xl">Dashboard</Link>
                            <Link to="/destiny" className="hover:underline hover:text-2xl">Destinations</Link>
                            <Link to="/testimonial" className="hover:underline hover:text-2xl">Testimonials</Link>
                            <Link to="/contact" className="hover:underline hover:text-2xl">Contact</Link>
                            {/* <Link to="/admin-packages" className="hover:underline hover:text-2xl">Manage Packages</Link>
                            <Link to="/admin-bookings" className="hover:underline hover:text-2xl">Bookings</Link>
                            <Link to="/admin-users" className="hover:underline hover:text-2xl">Users</Link> */}
                        </>
                    ) : (
                        <>
                            <Link to="/member" className="hover:underline hover:text-2xl">About Us</Link>
                            <Link to="/trips" className="hover:underline hover:text-2xl">My Bookings</Link>
                            <Link
                                to={isLoggedIn ? "/card" : "/login"}
                                className="hover:underline hover:text-2xl"
                                onClick={(e) => {
                                    if (!isLoggedIn) {
                                        e.preventDefault();
                                        navigate("/login");
                                    }
                                }}
                            >
                                Book Now
                            </Link>
                            <Link to="/testimonial" className="hover:underline hover:text-2xl">Testimonials</Link>
                            <Link to="/contact" className="hover:underline hover:text-2xl">Contact</Link>
                        </>
                    )}
                </nav>

                {/* Profile Dropdown */}
                <div className="flex items-center gap-4 relative z-20" ref={dropdownRef}>
                    {isLoggedIn ? (
                        <>
                            <button
                                className="text-3xl hover:text-4xl"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <IoMdPerson />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-white text-black border rounded-lg shadow-md">
                                    {/* {role === "Admin" ? (
                                        <button
                                            onClick={() => navigate("/admin-dashboard")}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Admin Panel
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate("/trips")}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            My Trips
                                        </button>
                                    )} */}
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link to="/signup">
                            <button className="bg-white text-[#f5475f] px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                                Sign Up
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
