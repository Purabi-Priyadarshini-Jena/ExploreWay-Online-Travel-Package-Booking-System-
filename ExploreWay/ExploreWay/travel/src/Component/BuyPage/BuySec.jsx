import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BuySec = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    totalPrice = 499,
    product,
    persons,
    nights,
    fullName,
    mobile,
  } = location.state || {};

  const [amount, setAmount] = useState(totalPrice);
  const [name, setName] = useState(fullName || "");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // ✅ Updated regex
    const mobileRegex = /^[0-9]{10}$/;

    if (!name || !email || !amount) {
      setError("Please fill all fields.");
      return;
    }

    if (!nameRegex.test(name)) {
      setError("Name must contain only letters and spaces.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Email must be a valid Gmail address.");
      return;
    }

    if (!mobileRegex.test(mobile)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    setError("");
    setLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      setError("Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      setError("Razorpay key is missing in environment variables.");
      setLoading(false);
      return;
    }

    try {
      const { data: orderData } = await axios.post(
        "http://localhost:9009/api/v1/payment/order",
        { amount: parseInt(amount) }
      );

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Travel Co",
        description: product?.location || "Travel Package",
        order_id: orderData.id,
        handler: async function (response) {
          toast.success("Payment successful!");

          try {
            const token = localStorage.getItem("token");

            await axios.post(
              "http://localhost:9009/api/v1/trips/save",
              {
                product,
                persons,
                nights,
                fullName: name,
                mobile,
                email,
                amount,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            toast.success("Trip saved successfully!");
            setTimeout(() => navigate("/trips"), 1000);
          } catch (err) {
            console.error("Trip Save Error:", err);
            toast.error("Trip save failed, but payment was successful.");
          }
        },
        prefill: { name, email },
        theme: { color: "#ff6347" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border-2 border-gray-200 transform transition-all hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-semibold text-center text-gray-900 mb-8">
          Buy Travel Package
        </h2>

        {product && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg mb-6 shadow-md">
            <p><strong className="text-gray-800">Destination:</strong> {product.location}</p>
            <p><strong className="text-gray-800">Persons:</strong> {persons}</p>
            <p><strong className="text-gray-800">Nights:</strong> {nights}</p>
            <p><strong className="text-gray-800">Mobile:</strong> {mobile}</p>
          </div>
        )}

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-6 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
        />

        <button
          onClick={handleRazorpayPayment}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-3 px-4 rounded-lg transition duration-200 ease-in-out disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay ₹${amount} with Razorpay`}
        </button>

        {error && (
          <p className="mt-4 text-red-600 text-sm text-center font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default BuySec;
