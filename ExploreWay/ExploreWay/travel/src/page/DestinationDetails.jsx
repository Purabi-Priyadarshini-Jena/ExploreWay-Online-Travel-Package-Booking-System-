import React, { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../Layout/Navbar";

let fetchedIds = new Set();

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState(null);
  const [count, setcount] = useState(0);
  const hasFetched = useRef(false);
  

  useEffect(() => {
if (fetchedIds.has(id)) return;

    fetchedIds.add(id); // Mark as fetched

console.log(hasFetched.current)
    const fetchDestination = async () => {
        console.log(count)
      try {
        const res = await axios.get(`http://localhost:9009/api/v1/products/${id}`);
        setDestination(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Destination not found.");
      }
    };
    
    fetchDestination();
  },[id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  // console.log(!destination)
  if(destination===null) return (<p className="text-black-600 text-center mt-10">Loading...</p>)

  const galleryImages = Array.isArray(destination.images) && destination.images.length > 0
    ? destination.images
    : destination.photo
      ? [destination.photo]
      : [];

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat pt-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1686278530308-1e6ef38b5ed6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWlycGxhbmUlMjBza3l8ZW58MHx8MHx8fDA%3D')",
        }}
      >
        <div className="bg-opacity-80 backdrop-blur-sm p-4 sm:p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-bold text-black mb-4 text-center sm:text-left">
              {destination.location || "Unknown Location"}
            </h1>

            <div className="text-base sm:text-2xl text-black-700 space-y-2 mb-6">
              <p><strong>Category:</strong> {destination.category || "N/A"}</p>
              <p><strong>Price/Night:</strong> ₹{destination.night || "N/A"}</p>
              <p><strong>Rating:</strong> ⭐ {destination.ratings || "N/A"}</p>
            </div>

            <p className="text-sm sm:text-2xl text-black-800 mb-8">
              <strong>Description:</strong> {destination.description || "No description available."}
            </p>

            {galleryImages.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((img, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                    >
                      <img src={img} alt={`Gallery ${index}`} className="w-full h-48 object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Attractions - if needed */}
            {/* Add back if desired */}

            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Location Map</h2>
              <div className="w-full h-[500px] sm:h-[400px]">
                <iframe
                  title="map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(destination.location || '')}&output=embed`}
                />
              </div>
            </div>

            {destination.extraInfo && (
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4">More Info</h2>
                <div className="text-black-800 whitespace-pre-line space-y-2">
                  {destination.extraInfo
                    .split('\n')
                    .map((line, i) => {
                      const isHeading = /^([🧭🛎️🏨📌📍⭐🔍✅📷🏖️🎉]|\d+\.)\s/i.test(line);
                      return (
                        <p
                          key={i}
                          className={
                            isHeading
                              ? 'text-3xl sm:text-3xl font-bold text-black-900 mt-6 mb-3'
                              : 'text-base sm:text-2xl text-black-800'
                          }
                        >
                          {line}
                        </p>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationDetails;
