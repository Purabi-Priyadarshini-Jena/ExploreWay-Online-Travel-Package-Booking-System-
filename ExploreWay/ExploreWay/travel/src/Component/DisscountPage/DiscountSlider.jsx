import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Replace these image paths with real local files or URLs
const sliderImages = [
  {
    image: "https://img.freepik.com/premium-photo/scaling-summit-conquering-majestic-snowcapped-peaks-adrenalinefueled-climbing-expedition_27525-50285.jpg?ga=GA1.1.359825390.1743182094&semt=ais_hybrid&w=740",
    title: "Adventures in the Himalayas",
  },
  {
    image: "https://mehdipixel.com/wp-content/uploads/2020/06/DSC04317.jpg",
    title: "Relax at Goa Beaches",
  },
  {
    image: "https://media.istockphoto.com/id/520077337/photo/houseboat-on-kerala-backwaters-india.jpg?s=612x612&w=0&k=20&c=H5X25NYoRcvXzGHRnR57x8QsWVyNcPJBy2vgSMlskz0=",
    title: "Experience Kerala's Backwaters",
  },
];



const allOffers = [
  {
    title: "Romantic Udaipur Getaway",
    subtitle: "3N/4D starting from ₹7,999 per person!",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/10/66/c6/5b/romantic-gateway-via.jpg",
    type: "HOLIDAYS",
  },
  {
    title: "Explore the Backwaters of Kerala",
    subtitle: "Houseboat experience with 20% off.",
    image: "https://media.istockphoto.com/id/520077337/photo/houseboat-on-kerala-backwaters-india.jpg?s=612x612&w=0&k=20&c=H5X25NYoRcvXzGHRnR57x8QsWVyNcPJBy2vgSMlskz0=",
    type: "RESORTS",
  },
  {
    title: "Goa Beach Resorts Sale",
    subtitle: "Up to 30% off on premium beachside stays.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/1a/b7/70/caption.jpg?w=700&h=-1&s=1",
    type: "HOTELS",
  },
  {
    title: "Shimla & Manali Packages",
    subtitle: "5N/6D starting at ₹11,999*.",
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=600&q=80",
    type: "HOLIDAYS",
  },
  {
    title: "Train Journeys to the Royal Rajasthan",
    subtitle: "Luxury rail experiences now at special rates.",
    image: "https://www.themaharajatrain.com/wp-content/uploads/2024/07/The-Rajasthan-Express-train-Schedule.webp",
    type: "TRAVEL",
  },
  {
    title: "Northeast India Explorer",
    subtitle: "Up to 25% off on select packages.",
    image: "https://images.herzindagi.info/image/2022/Feb/Tawang.jpg",
    type: "ADVENTURE",
  },
  {
    title: "Trekking in Himachal Pradesh",
    subtitle: "Save on guided treks this season.",
    image: "https://img.freepik.com/premium-photo/scaling-summit-conquering-majestic-snowcapped-peaks-adrenalinefueled-climbing-expedition_27525-50285.jpg?ga=GA1.1.359825390.1743182094&semt=ais_hybrid&w=740",
    type: "ADVENTURE",
  },
  {
    title: "Spiritual Retreat in Rishikesh",
    subtitle: "Yoga & wellness packages at discounted prices.",
    image: "https://media1.thrillophilia.com/filestore/l1stgsdtm1wlcgkfhkg49pers7qj_WDEFRGTYH.png?w=753&h=450&dpr=2.0",
    type: "WELLNESS",
  },
  {
    title: "Monsoon Deals in Coorg",
    subtitle: "Stay & Explore packages from ₹4,999.",
    image: "https://www.agoda.com/wp-content/uploads/2024/04/Iruppu-waterfalls-in-Coorg-India.jpg",
    type: "HOLIDAYS",
  },
  {
    title: "South India Temple Tour",
    subtitle: "Chennai – Madurai – Rameswaram circuit.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaVvwKK1qIRce3TAen-Rko-FIG-VaWgY4kSlMjUYzkETpR5Jgg6hs65w8zPkSm00WVylI&usqp=CAU",
    type: "CULTURAL",
  },
  {
    title: "Adventure in Andaman Islands",
    subtitle: "Scuba diving and island hopping specials.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLwsVBmRkfUMyXLM9gE1twka8I8YA7o1YyRw&s",
    type: "ADVENTURE",
  },
  {
    title: "Lonavala Weekend Getaway",
    subtitle: "2N/3D stay for ₹3,999 only.",
    image: "https://static.wixstatic.com/media/b4110a_ea4bea85d57a4ab4a419dc3472352f1b~mv2.jpg/v1/fill/w_568,h_332,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/b4110a_ea4bea85d57a4ab4a419dc3472352f1b~mv2.jpg",
    type: "WEEKEND TRIP",
  },
];



const DisscountSlider = () => {
  const previewCount = 3;
  const offersPerPage = 6;

  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleOffers, setVisibleOffers] = useState([]);

  useEffect(() => {
    if (showAll) {
      const startIdx = (currentPage - 1) * offersPerPage;
      const endIdx = startIdx + offersPerPage;
      setVisibleOffers(allOffers.slice(startIdx, endIdx));
    } else {
      setVisibleOffers(allOffers.slice(0, previewCount));
      setCurrentPage(1);
    }
  }, [showAll, currentPage]);

  const totalPages = Math.ceil(allOffers.length / offersPerPage);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 200,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-black">OFFERS</h2>
        </div>

        {/* Image Slider */}
        <div className="w-full">
          <div className="relative mb-10 overflow-hidden shadow-sm rounded-xl">
            <Slider {...sliderSettings}>
              {sliderImages.map((item, index) => (
                <div key={index}>
                  <div className="relative h-[500px] w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <h2 className="text-white text-4xl font-bold text-center px-4">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Offers Cards */}
        <div
          className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 transition-all duration-500 ease-in-out ${
            showAll ? "opacity-100 max-h-[3000px]" : "opacity-100 max-h-[1500px]"
          }`}
          style={{ overflow: "hidden" }}
        >
          {visibleOffers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 flex gap-5 items-start hover:shadow-lg transition-all"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-24 h-24 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-semibold">{offer.type}</p>
                <h3 className="text-lg font-bold text-gray-800">{offer.title}</h3>
                <p className="text-sm text-gray-600">{offer.subtitle}</p>
                <button className="mt-2 text-blue-600 text-sm font-semibold hover:underline">
                  BOOK NOW
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {showAll && totalPages > 1 && (
          <div className="flex justify-center space-x-2 mb-6">
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-blue-400 hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        )}

        {/* View All / Hide Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {showAll ? "Hide Offers" : "View All Offers"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisscountSlider;