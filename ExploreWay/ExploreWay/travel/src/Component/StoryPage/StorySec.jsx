import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const StorySec = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [persons, setPersons] = useState(1);
  const [nights, setNights] = useState(1);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");

  const manualAmenities = [
    "Airport Pickup & Drop",
    "24/7 Customer Support",
    "Guided Tours",
    "Local Sightseeing Included",
    "Travel Insurance",
    "Flexible Cancellation Policy",
    "Pet-Friendly Accommodation",
    "In-room Dining Service",
    "Cultural/Adventure Activities Included",
    "Medical Assistance On Call",
    "Hotels & Travels Included",
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:9009/api/v1/products/${id}`)
      .then((response) => {
        setDestination(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching destination:", err);
        setError("Failed to load destination details.");
        setLoading(false);
      });
  }, [id]);

  const handleIncreasePersons = () => setPersons((prev) => prev + 1);
  const handleDecreasePersons = () => setPersons((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncreaseNights = () => setNights((prev) => prev + 1);
  const handleDecreaseNights = () => setNights((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = destination ? (destination.night || 0) * persons * nights : 0;

  const handlePayNow = () => {
    let valid = true;

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!fullName.trim()) {
      setNameError("Full name is required.");
      valid = false;
    } else if (!nameRegex.test(fullName)) {
      setNameError("Name must contain only letters and spaces.");
      valid = false;
    } else {
      setNameError("");
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile.trim()) {
      setMobileError("Mobile number is required.");
      valid = false;
    } else if (!mobileRegex.test(mobile)) {
      setMobileError("Mobile number must be exactly 10 digits.");
      valid = false;
    } else {
      setMobileError("");
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Email must be a valid Gmail address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!valid) return;

    navigate("/buy", {
      state: {
        product: destination,
        persons,
        nights,
        totalPrice,
        fullName,
        mobile,
        email,
      },
    });
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-8 mt-12">
      {/* Destination card */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative overflow-hidden">
          <img
            src={destination.photo || "https://via.placeholder.com/400"}
            alt={destination.location}
            className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-6 flex-grow">
          <h2 className="text-2xl font-bold text-gray-800">
            {destination.location || "Unknown Destination"}
          </h2>
          <p className="text-gray-600 mt-2">
            {destination.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Booking form */}
      <div className="w-full md:w-1/2 shadow-lg rounded-lg p-6 md:ml-6 mt-6 md:mt-0 flex flex-col h-full transform transition-transform duration-300">
        <h3 className="text-xl font-semibold text-gray-800">Booking Information</h3>
        <p className="text-gray-600 mt-2">
          <strong>Location:</strong> {destination.location || "Not Available"}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Price Per Night:</strong> ${destination.night || "N/A"}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Rating:</strong> ⭐ {destination.ratings || "No Ratings"}
        </p>

        <h4 className="text-lg font-semibold mt-4">Amenities:</h4>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          {manualAmenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>

        <div className="mt-4">
          <h4 className="text-lg font-semibold">Booking Details</h4>

          <label className="block mt-3">Full Name</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${nameError ? 'border-red-500' : 'focus:ring-blue-300'}`}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (e.target.value.trim()) setNameError("");
            }}
            placeholder="Enter your full name"
          />
          {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}

          <label className="block mt-3">Mobile Number</label>
          <input
            type="tel"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${mobileError ? 'border-red-500' : 'focus:ring-blue-300'}`}
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              if (e.target.value.trim()) setMobileError("");
            }}
            placeholder="Enter your mobile number"
          />
          {mobileError && <p className="text-sm text-red-500 mt-1">{mobileError}</p>}

          <label className="block mt-3">Email</label>
          <input
            type="email"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${emailError ? 'border-red-500' : 'focus:ring-blue-300'}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value.trim()) setEmailError("");
            }}
            placeholder="Enter your email"
          />
          {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}

          <div className="flex items-center gap-3 mt-2">
            <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition" onClick={handleDecreaseNights}>-</button>
            <span className="font-semibold">{nights} Night(s)</span>
            <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition" onClick={handleIncreaseNights}>+</button>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition" onClick={handleDecreasePersons}>-</button>
            <span className="font-semibold">{persons} Persons</span>
            <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition" onClick={handleIncreasePersons}>+</button>
          </div>

          <p className="text-lg font-semibold text-blue-600 mt-3">Total Price: ${totalPrice}</p>
        </div>

        <button
          onClick={handlePayNow}
          className="mt-auto bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Pay Now (${totalPrice})
        </button>
      </div>
    </div>
  );
};

export default StorySec;
