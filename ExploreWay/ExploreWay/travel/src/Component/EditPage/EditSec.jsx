import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditSec = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [ratings, setRatings] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:9009/api/v1/products/${id}`)
    .then((response) => {
  const { location, category, photo, description, price, ratings, extraInfo } = response.data;
  setLocation(location);
  setCategory(category);
  setPhoto(photo);
  setDescription(description);
  setPrice(price?.toString() || "");       // 👈 Convert to string
  setRatings(ratings?.toString() || "");   // 👈 Convert to string
  setExtraInfo(extraInfo);
})

      .catch((error) => console.error("Error fetching story:", error));
  }, [id]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cleanTechMart");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/datf6laqn/image/upload",
          formData
        );
        setPhoto(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("File upload failed. Please try again.");
      }
    }
  };

const validateForm = () => {
  const newErrors = {};
  if (!location || location.length < 5) newErrors.location = "Please enter a valid location.";
  if (!category) newErrors.category = "Category is required.";
  if (!description || description.length < 10) newErrors.description = "Description must be at least 10 characters.";

  if (price === "" || isNaN(price) || Number(price) <= 0) {
    newErrors.price = "Enter a valid price.";
  }

  if (ratings === "" || isNaN(ratings) || Number(ratings) < 0 || Number(ratings) > 5) {
    newErrors.ratings = "Ratings must be between 0 and 5.";
  }

  if (!extraInfo || extraInfo.length < 5) newErrors.extraInfo = "Please provide more details.";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
    const updatedStory = {
  location,
  category,
  photo,
  description,
  price: Number(price),     // 👈 Convert back to number
  ratings: Number(ratings), // 👈 Convert back to number
  extraInfo,
};

      await axios.put(`http://localhost:9009/api/v1/products/${id}`, updatedStory);
      alert("Story updated successfully!");
      navigate("/destiny");
    } catch (error) {
      console.error("Error updating story:", error);
      alert("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 flex justify-center items-start px-6 py-8 bg-gray-400 min-h-screen w-[95%] mx-auto rounded-lg shadow-sm">
      <div className="card lg:flex bg-base-100 shadow-md w-full h-full p-6 flex flex-col lg:flex-row overflow-hidden space-x-6">
        {/* Image Section */}
        <figure className="lg:w-1/2 flex items-center justify-center">
          <img src={photo} alt="Story Preview" className="w-full h-[20rem] object-cover rounded-lg" />
        </figure>

        {/* Content Section */}
        <div className="card-body flex-1 overflow-auto">
          <h2 className="card-title text-2xl font-semibold text-white">Edit Story</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

            <div className="flex flex-col">
              <label className="text-white font-bold">Location:</label>
              <input
                type="text"
                className="input input-bordered h-12 rounded-xl border-black border-2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {errors.location && <span className="text-red-600 text-sm">{errors.location}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-white font-bold">Category:</label>
              <input
                type="text"
                className="input input-bordered h-12 rounded-xl border-black border-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {errors.category && <span className="text-red-600 text-sm">{errors.category}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-white font-bold">Upload New Image:</label>
              <input
                type="file"
                className="file-input file-input-bordered h-30 rounded-xl border-black border-2"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white font-bold">Description:</label>
              <textarea
                className="textarea textarea-bordered h-24 rounded-xl border-black border-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && <span className="text-red-600 text-sm">{errors.description}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-white font-bold">Price:</label>
              <input
                type="number"
                className="input input-bordered h-12 rounded-xl border-black border-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && <span className="text-red-600 text-sm">{errors.price}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-white font-bold">Ratings:</label>
              <input
                type="number"
                step="0.1"
                max="5"
                className="input input-bordered h-12 rounded-xl border-black border-2"
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
              />
              {errors.ratings && <span className="text-red-600 text-sm">{errors.ratings}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-white font-bold">More Details:</label>
              <textarea
                className="textarea textarea-bordered h-24 rounded-xl border-black border-2"
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
              ></textarea>
              {errors.extraInfo && <span className="text-red-600 text-sm">{errors.extraInfo}</span>}
            </div>

            <div className="card-actions flex justify-evenly items-center mt-4">
              <button
                type="submit"
                className="btn btn-primary bg-orange-600 text-white w-[10rem] h-[3rem] rounded-2xl"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="btn btn-secondary bg-orange-600 text-white w-[10rem] h-[3rem] rounded-2xl"
                onClick={() => navigate("/card")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSec;
