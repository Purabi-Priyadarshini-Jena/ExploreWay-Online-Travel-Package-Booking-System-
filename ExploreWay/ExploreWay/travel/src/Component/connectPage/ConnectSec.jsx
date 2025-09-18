// import React from 'react'
// import { Link } from 'react-router-dom'
// import jr from '../../assets/jour.jpeg'

// const ConnectSec = () => {
//   return (
//     <div className='flex flex-col md:flex-row justify-evenly items-center h-auto md:h-[30rem] p-8 gap-8 bg-white/0 backdrop-blur-md rounded-lg shadow-md '>
//       <div>
//         <img src={jr} alt="" className='h-[25rem] rounded-3xl mx-auto' />
//       </div>
//       <div className='flex flex-col h-auto md:h-[10rem] justify-evenly items-center md:items-start text-center md:text-left'>
//         <h1 className='text-4xl font-bold'>Best Way To Start Journey!</h1>
//         <p className='mb-4'>We Offer personalized guides to individual clients</p>
//         <Link
//           to="/login"
//           className='py-3 text-center w-[13rem] bg-orange-500 h-[3rem] rounded-3xl font-semibold text-white tracking-wider'
//         >
//           Start Here
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default ConnectSec

import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import img1 from '../../assets/imgg.webp';
import img2 from '../../assets/img1.jpeg';
import img3 from '../../assets/img2.jpeg';

const ConnectSec = () => {
  const galleryImages = [
    { src: img1, title: 'Airport Vibes', desc: 'Start your journey with a relaxed mind.' },
    { src: img2, title: 'Window Views', desc: 'Admire beautiful skies and cityscapes.' },
    { src: img3, title: 'Travel Ready', desc: 'Pack light, explore more.' },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <div className='flex flex-col md:flex-row justify-evenly items-center h-auto md:h-[38rem] p-8 gap-10 bg-gradient-to-b bg-sky-100 rounded-lg shadow-lg'>
      
      {/* Custom Expanding Gallery */}
      <div className="relative max-w-[900px] overflow-x-auto">
        <div className="w-fit mx-auto gap-2 flex pb-10 pt-10">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`group rounded-xl relative h-[400px] flex-shrink-0 transition-all duration-500 origin-center 
                ${hoveredIndex === index ? 'w-[280px]' : 'w-[80px]'}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(0)}
            >
              <img src={img.src} alt={`Gallery ${index}`} className="w-full h-full object-cover rounded-xl cursor-pointer" />
              <article className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1 className="text-xl font-semibold">{img.title}</h1>
                <p className="text-sm">{img.desc}</p>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Heading + CTA */}
      <div className='flex flex-col h-auto justify-evenly items-center md:items-start text-center md:text-left max-w-md space-y-4'>
        <h1 className='text-4xl font-extrabold text-gray-800'>
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
            Best Way To Start Journey!
          </span>
        </h1>
        <p className='text-gray-600 text-lg'>
          We offer personalized travel guides and seamless planning for every explorer.
        </p>
        <ul className="text-sm text-gray-700 space-y-2 self-start">
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-orange-500" /> Custom itineraries tailored to you
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-orange-500" /> Expert local guides
          </li>
          <li className="flex items-center gap-2">
            <FaCheckCircle className="text-orange-500" /> 24/7 customer support
          </li>
        </ul>
        <Link
          to="/login"
          className='mt-4 py-3 w-[13rem] bg-orange-500 h-[3rem] rounded-3xl font-semibold text-white tracking-wider text-center hover:bg-orange-600 transition duration-300'
        >
          Start Here
        </Link>
      </div>
    </div>
  );
};

export default ConnectSec;

