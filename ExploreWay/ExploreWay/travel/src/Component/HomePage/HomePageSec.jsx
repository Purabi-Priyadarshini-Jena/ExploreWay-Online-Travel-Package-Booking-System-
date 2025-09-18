
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import vdo1 from "../../assets/vdo1.mp4";
import vdo4 from "../../assets/vdo4.mp4"; // Add more videos as needed
import vdo3 from "../../assets/vdo3.mp4";
import vdo6 from "../../assets/vdo6.mp4";

const videoList = [vdo1, vdo4, vdo3, vdo6];

const HomePageSec = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videoList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === videoList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Slider */}
      <video
        key={videoList[currentIndex]}
        src={videoList[currentIndex]}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition duration-500"
      ></video>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white px-4 bg-black/30">
        <div className="w-full max-w-5xl flex flex-col items-center space-y-8 text-center">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl text-center bg-gradient-to-r from-orange-300 via-white to-orange-300 bg-clip-text text-transparent drop-shadow-[2px_2px_6px_rgba(0,0,0,0.6)]">
            Unlock Your Travel Dreams <br className="hidden sm:block" /> With Us
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-white text-center drop-shadow-[1px_1px_4px_rgba(0,0,0,0.7)] max-w-2xl">
            Discover the world's most adventurous nature, life is too short for a trip.
          </p>


          <button
            onClick={() => navigate("/signup")}
            className="flex items-center justify-center h-12 w-48 bg-orange-600 text-orange-100 hover:text-orange-600 hover:bg-orange-200 rounded-3xl px-6 transition"
          >
            Get Started <MdPlayArrow size={24} className="ml-1" />
          </button>
        </div>

        {/* Slider Arrows */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-between px-8">
          <button onClick={handlePrev} className="text-white bg-black/40 p-2 rounded-full hover:bg-black/60">
            <FaArrowLeft size={20} />
          </button>
          <button onClick={handleNext} className="text-white bg-black/40 p-2 rounded-full hover:bg-black/60">
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageSec;
