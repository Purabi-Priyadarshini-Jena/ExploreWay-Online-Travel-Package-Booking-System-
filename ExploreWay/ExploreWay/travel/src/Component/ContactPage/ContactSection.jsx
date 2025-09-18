import React, { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const validateForm = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const mobileRegex = /^[0-9]{10}$/;

  if (!formData.name || !formData.email || !formData.mobile || !formData.message) {
    return "All fields are required.";
  }

  if (!emailRegex.test(formData.email)) {
    return "Email must be a valid Gmail address (e.g., example123@gmail.com).";
  }

  if (!mobileRegex.test(formData.mobile)) {
    return "Mobile number must be exactly 10 digits.";
  }

  return "";
};


const handleSubmit = async (e) => {
  e.preventDefault(true);

  const errorMsg = validateForm();
  if (errorMsg) {
    setError(errorMsg);
    return;
  }

  try {
    const response = await fetch("http://localhost:9009/api/v1/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // ✅ use actual form data
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.success) {
      alert("Message sent successfully!");
    } else {
      alert("Something went wrong.");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Failed to send message.");
  }
};


  return (
    <div
      className="relative bg-cover bg-center mt-20"
      style={{
        backgroundImage: `url("/images/contact-bg.jpg")`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col lg:flex-row m-6">
        <div className="lg:w-1/2 flex flex-col items-start justify-center px-4 py-8 lg:py-0 lg:px-16 bg-white bg-opacity-90 rounded-xl shadow-md">
          <h2 className="text-4xl font-bold text-green-600 mb-4">Contact us</h2>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Get in <span className="text-green-600">Touch</span>
          </h3>
          <p className="text-gray-600 mb-6">
            Send us your message and we'll get back to you within 2–4 business hours.
          </p>

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block text-gray-700 mb-2">Mobile *</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="10-digit Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Comment or Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#5eb7b2] text-white font-semibold rounded-md hover:bg-[#499f9a] transition-all"
              >
                POST COMMENT
              </button>
            </div>
          </form>
        </div>

        {/* Right - Google Map */}
        <div className="lg:w-1/2 flex items-center justify-center bg-white bg-opacity-90 p-4 lg:p-16 rounded-xl shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15543.76270989691!2d77.54355684080397!3d13.102944643447929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae227c44a8dda3%3A0x9eb19b877115f465!2sVeerasagara%20Main%20Rd%2C%20Attur%20Layout%2C%20Yelahanka%20New%20Town%2C%20Bengaluru%2C%20Karnataka%20560064!5e0!3m2!1sen!2sin!4v1722332087063!5m2!1sen!2sin"
            width="100%"
            height="550"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;