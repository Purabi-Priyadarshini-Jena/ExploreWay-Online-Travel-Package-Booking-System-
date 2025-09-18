import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { MdCreateNewFolder, MdDeleteOutline } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";

const imgPlaceholder = "https://via.placeholder.com/300";

const CardsSec = () => {
  const [cardData, setCardData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.role === "admin");
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }

    axios
      .get("http://localhost:9009/api/v1/products/allproduct")
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          id: item._id,
          name: item.location || "Unknown",
          category: item.category?.trim()?.toLowerCase() || "Uncategorized",
          description: item.description || "No description available",
          night: 1,
          persons: 1,
          ratings: item.ratings || 0,
          photo: item.photo || imgPlaceholder,
          pricePerNight: item.night || 0,
        }));
        setCardData(formattedData);
        setCategories(["all", ...new Set(formattedData.map((item) => item.category))]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleIncreasePersons = (id) => {
    setCardData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, persons: item.persons + 1 } : item
      )
    );
  };

  const handleDecreasePersons = (id) => {
    setCardData((prevData) =>
      prevData.map((item) =>
        item.id === id && item.persons > 1 ? { ...item, persons: item.persons - 1 } : item
      )
    );
  };

  const handleIncreaseNights = (id) => {
    setCardData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, night: item.night + 1 } : item
      )
    );
  };

  const handleDecreaseNights = (id) => {
    setCardData((prevData) =>
      prevData.map((item) =>
        item.id === id && item.night > 1 ? { ...item, night: item.night - 1 } : item
      )
    );
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9001/api/v1/products/${id}`)
      .then(() => setCardData((prevData) => prevData.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting card:", error));
  };

  const handleBookNow = (id) => {
    navigate(`/story/${id}`);
  };

  const filteredData =
    selectedCategory === "all"
      ? cardData
      : cardData.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-4 md:p-6 mt-24">
      {isAdmin && (
        <div className="flex justify-center mb-6 ">
          <Link to="/add" className="text-5xl">
            <FcAddImage className="hover:scale-110 transition-transform duration-300 mt-10" />
          </Link>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-xl transition-colors duration-300 ${
              selectedCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-orange-100 shadow-md rounded-xl p-4 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <figure className="relative w-full h-48 flex items-center justify-center bg-gray-100 overflow-hidden">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onError={(e) => (e.target.src = imgPlaceholder)}
                />
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <MdCreateNewFolder
                      className="text-3xl cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-300"
                      onClick={() => navigate(/edit/`${item.id}`)}
                    />
                    <MdDeleteOutline
                      className="text-3xl cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-300"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                )}
              </figure>
              <h2 className="text-lg font-bold mt-2">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>

              <p className="text-sm font-semibold text-blue-600 mt-2">
                ${item.pricePerNight * item.night * item.persons} / Total
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => handleDecreaseNights(item.id)}
                >
                  -
                </button>
                <span className="font-semibold">{item.night} Nights</span>
                <button
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => handleIncreaseNights(item.id)}
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => handleDecreasePersons(item.id)}
                >
                  -
                </button>
                <span className="font-semibold">{item.persons} Persons</span>
                <button
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => handleIncreasePersons(item.id)}
                >
                  +
                </button>
              </div>

              <button
                className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300"
                onClick={() => handleBookNow(item.id)}
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No destinations found.</p>
        )}
      </div>
    </div>
  );
};

export default CardsSec;