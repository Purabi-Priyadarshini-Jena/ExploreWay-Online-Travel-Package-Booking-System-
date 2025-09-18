import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AddupSec = () => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [night, setNight] = useState("");
  const [ratings, setRatings] = useState("");
  const [persons, setPersons] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const categories = ["Mountains", "Beach", "Historical",
    "Cultural", "Spiritual", "Garden", "Island"];

  useEffect(() => {
    if (!loading && submitted) {
      navigate("/admin-dashboard");
    }
  }, [loading, submitted, navigate]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cleanTechMart");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/datf6laqn/image/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setPhoto(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("File upload failed. Please try again.");
      }
    }
  };

  const validateForm = () => {
    const alphabetRegex = /^[a-zA-Z\s\-–'.,()]{5,}$/;
;
;

    if (!location.trim() || !alphabetRegex.test(location.trim())) {
      toast.error("Location must be at least 5 letters and only contain alphabets.");
      return false;
    }

    if (!category.trim()) {
      toast.error("Category is required.");
      return false;
    }

    if (!photo) {
      toast.error("Photo must be uploaded.");
      return false;
    }

    const descriptionWords = description.trim().split(/\s+/);
    if (descriptionWords.length < 5) {
      toast.error("Description must contain at least 10 words.");
      return false;
    }

    const nightValue = parseFloat(night);
    if (isNaN(nightValue) || nightValue < 100) {
      toast.error("Night price must be a number and at least ₹100.");
      return false;
    }


    const ratingValue = Number(ratings);
    if (
      !ratings ||
      isNaN(ratingValue) ||
      ratingValue < 0 ||
      ratingValue > 5
    ) {
      toast.error("Ratings must be a number between 0 and 5.");
      return false;
    }

    const personValue = Number(persons);
    if (!persons || isNaN(personValue) || personValue <= 0) {
      toast.error("Persons must be a positive number.");
      return false;
    }

    const wordCount = extraInfo.trim().split(/\s+/).length;
    if (!extraInfo.trim() || wordCount < 250) {
      toast.error("More Details must contain at least 250 words.");
      return false;
    }

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) return;
    setSubmitted(false);

    try {
      const requestData = {
        location,
        category,
        photo,
        description,
        night,
        ratings,
        persons,
        extraInfo,
      };
      const response = await axios.post(
        "http://localhost:9009/api/v1/products/product",
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        toast.success("Trip added successfully!");
        setSubmitted(true);
      } else {
        toast.error("Failed to add trip");
      }
    } catch (error) {
      console.error("Error submitting trip:", error);
      toast.error(
        "Error submitting trip: " +
        (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center h-[60rem] w-[40rem] mx-auto mt-[7rem]  bg-gray-700 rounded-xl">
      <form
        className="flex flex-col justify-evenly items-center h-[60rem] w-[100%] md:w-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-white text-3xl font-bold mb-6">ADD NEW TRIP</h2>

        <div className="flex flex-col">
          <label className="text-black font-bold pl-2">Location:</label>
          <input
            type="text"
            placeholder="Add the Location"
            className="w-[30rem] h-[3rem] pl-2 rounded-xl border-2 border-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-bold pl-2">Category:</label>
          <select
            className="w-[30rem] h-[3rem] pl-2 rounded-xl border-2 border-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-black font-bold pl-2">Photo:</label>
          <input
            type="file"
            className="w-[30rem] h-[3rem] pl-2 rounded-xl border-2 border-black"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-bold pl-2">Description:</label>
          <textarea
            placeholder="Write a brief description"
            className="w-[30rem] h-[6rem] pl-2 rounded-xl border-2 border-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-black font-bold pl-2">Night:</label>
          <input
            type="number"
            placeholder="Enter cost per night"
            min="100"
            className="w-[30rem] h-[3rem] pl-2 rounded-xl border-2 border-black"
            value={night}
            onChange={(e) => setNight(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-bold pl-2">Ratings:</label>
          <input
            type="number"
            placeholder="Add Rating"
            min="0"
            max="5"
            className="w-[30rem] h-[3rem] pl-2 rounded-xl border-2 border-black"
            value={ratings}
            onChange={(e) => setRatings(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-bold pl-2">Persons:</label>
          <input
            type="number"
            min="1"
            placeholder="Number of Persons"
            className="w-[30rem] h-[3rem] pl-2 rounded-xl border-2 border-black"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-bold pl-2">More Details:</label>
          <p className="text-white text-sm pl-2">
            Word Count: {extraInfo.trim().split(/\s+/).filter(Boolean).length}
          </p>

          <textarea
            placeholder="Write a brief description"
            className="w-[30rem] h-[6rem] pl-2 rounded-xl border-2 border-black"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white w-[30rem] h-[3rem] text-center rounded-3xl font-semibold p-3 mt-4"
          disabled={loading}
        >
          {loading ? "Adding Trip..." : "Add This Trip"}
        </button>
      </form>
    </div>
  );
};

export default AddupSec;