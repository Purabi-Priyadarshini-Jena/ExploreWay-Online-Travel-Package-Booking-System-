//  import React from 'react';

// const MemberSec = () => {
//   const features = [
//     {
//       title: "Curated Travel Packages",
//       description:
//         "Explore hand-picked travel plans designed for your budget and preferences across India’s most iconic destinations.",
//       color: "bg-yellow-400",
//     },
//     {
//       title: "Instant Booking System",
//       description:
//         "Book your dream destination instantly with our real-time booking system powered by secure payments.",
//       color: "bg-green-400",
//     },
//     {
//       title: "24/7 Customer Support",
//       description:
//         "Our friendly support team is always ready to help you before, during, and after your trip.",
//       color: "bg-red-400",
//     },
//     {
//       title: "Personalized Recommendations",
//       description:
//         "Get destination suggestions based on your interests—beaches, mountains, heritage, and more.",
//       color: "bg-purple-400",
//     },
//   ];

//   return (
//     <section className="bg-[#0f172a] text-white py-20 px-6">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold mb-4">About Travel Story</h2>
//         <p className="text-gray-300 mb-12">
//           Travel Story helps you discover, plan, and book memorable journeys with ease. Whether you're dreaming of beaches, hills, or heritage sites – we've got the perfect package for you.
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="relative bg-[#111827] p-6 rounded-xl shadow-lg overflow-hidden transition hover:scale-105 duration-300"
//             >
//               {/* Corner Shape */}
//               <div
//                 className={`absolute top-0 right-0 w-16 h-16 rounded-bl-[40px] ${feature.color}`}
//               ></div>

//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-400">{feature.description}</p>
//               <span className="mt-4 inline-block text-yellow-400 font-medium cursor-pointer hover:underline">
//                 Know more
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MemberSec;

import React, { useRef } from "react";

const MemberSec = () => {
  const features = [
    {
      title: "Curated Travel Packages",
      description:
        "Discover hand-picked travel plans designed to match your preferences and budget across India’s most iconic destinations.",
      circleColor: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
    {
      title: "Instant Booking System",
      description:
        "Book your desired trip instantly using our real-time booking system with secure payment options like UPI, card, EMI, and wallet.",
      circleColor: "bg-green-600",
      textColor: "text-green-600",
    },
    {
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is available round-the-clock to assist you before, during, and after your trip.",
      circleColor: "bg-red-600",
      textColor: "text-red-600",
    },
    {
      title: "Personalized Recommendations",
      description:
        "Get destination suggestions based on your interests—whether it's adventure, relaxation, culture, or nature.",
      circleColor: "bg-purple-600",
      textColor: "text-purple-600",
    },
  ];

  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    const circle = card.querySelector(".circle-bg");
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (circle) {
      circle.style.top = `${y - 64}px`;
      circle.style.left = `${x - 64}px`;
    }
  };

  return (
    <section className="bg-[#c6e4ef] text-black pt-32 pb-20 px-6">
      <div className="max-w-8xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">About ExploreWay</h2>
        <p className="text-black mb-12 max-w-2xl mx-auto">
          ExploreWay helps you discover, plan, and book memorable travel
          experiences with ease. Whether you're dreaming of beaches, mountains,
          or heritage sites – we have the perfect travel packages tailored just
          for you.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              className="group relative w-full h-full transition-all duration-300"
            >
              <div className="overflow-hidden rounded-3xl shadow-lg h-full">
                <a
                  href="#!"
                  className="block p-8 bg-gray-700 relative overflow-hidden h-full"
                >
                  <div
                    className={`circle-bg absolute h-32 w-32 ${feature.circleColor} rounded-full opacity-30 pointer-events-none transition-all duration-300 ease-out`}
                    style={{
                      top: "-5rem",
                      left: "-5rem",
                    }}
                  ></div>
                  <div className="min-h-[87px] font-bold text-2xl text-white relative z-10 mb-2">
                    {feature.title}
                  </div>
                  <div className="text-white text-base mb-7 relative z-10">
                    {feature.description}
                  </div>
                  <div className="relative z-10">
                    <span
                      className={`inline-block font-semibold group-hover:underline ${feature.textColor}`}
                    >
                      Know more
                    </span>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberSec;
