// import React from "react";
// import { Link } from "react-router-dom"; // Import Link for internal navigation
// import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa6"; // Social Icons

// const Footer = () => {
//   return (
//     <footer className="bg-base-200 text-base-content py-10 px-6 bg-orange-500 text-black ">
//       {/* Navigation Links */}
//       <nav className="flex flex-col md:flex-row justify-center items-center gap-6 text-center">
//         <Link to="/destiny" className="link link-hover">Tour</Link>
//         <Link to="/member" className="link link-hover">Members</Link>
//         <a href="mailto:satyaranjanrout781@gmail.com" className="link link-hover">Contact Us</a>
//         {/* <Link to="/" className="link link-hover">Press Kit</Link>  */}
//       </nav>

//       {/* Social Icons */}
//       <nav className="flex justify-center mt-6 ">
//         <div className="flex gap-6">
//           <Link to="/">
//             <FaTwitter size={24} className="hover:text-blue-500 transition duration-300" />
//           </Link>
//           <Link to="/">
//             <FaYoutube size={24} className="hover:text-white transition duration-300" />
//           </Link>
//           <Link to="/">
//             <FaInstagram size={24} className="hover:text-purple-200 transition duration-300" />
//           </Link>
//         </div>
//       </nav>

//       {/* Copyright */}
//       <aside className="text-center mt-6">
//         <p>© {new Date().getFullYear()} - All rights reserved by Team Diamond Ltd</p>
//       </aside>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-sky-900 text-black py-6 px-6">
      {/* Navigation Links */}
      <nav className="flex flex-col md:flex-row justify-center items-center gap-6 text-lg font-medium">
        <Link to="/destiny" className="hover:text-yellow-100 hover:text-2xl font-semibold text-2xl">Tour</Link>
        <Link to="/member" className="hover:text-yellow-100 hover:text-2xl font-semibold text-2xl">Members</Link>
        <a href="mailto:satyaranjanrout781@gmail.com" className="hover:text-yellow-100 hover:text-2xl font-semibold text-2xl">Contact Us</a>
      </nav>

      {/* Social Icons */}
      <div className="flex justify-center mt-6">
        <div className="flex gap-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter size={24} className="hover:text-blue-600 transition duration-300" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube size={24} className="hover:text-red-600 transition duration-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram size={24} className="hover:text-pink-500 transition duration-300" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <aside className="text-center mt-6 text-sm">
        <p>© {new Date().getFullYear()} - All rights reserved by <span className="font-semibold">Team Diamond Ltd</span></p>
      </aside>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import { Link } from "react-router-dom";
// import { FaTwitter, FaYoutube, FaInstagram, FaArrowUp } from "react-icons/fa6";

// const Footer = () => {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <footer className="bg-orange-500 text-black px-6 pt-12 pb-6 relative">
//       {/* Top grid section */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
//         {/* Navigation */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Explore</h2>
//           <ul className="space-y-2">
//             <li>
//               <Link to="/destiny" className="hover:underline">Tour</Link>
//             </li>
//             <li>
//               <Link to="/member" className="hover:underline">Members</Link>
//             </li>
//             <li>
//               <a href="mailto:satyaranjanrout781@gmail.com" className="hover:underline">Contact Us</a>
//             </li>
//           </ul>
//         </div>

//         {/* Newsletter */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
//           <p className="text-sm mb-3">Get travel tips & exclusive deals</p>
//           <form className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start">
//             <input
//               type="email"
//               placeholder="Your email"
//               className="px-4 py-2 rounded-md w-full sm:w-auto text-black focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>

//         {/* Social */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
//           <div className="flex justify-center md:justify-start gap-6">
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:scale-110 transition-transform duration-300"
//             >
//               <FaTwitter size={24} className="hover:text-blue-700" />
//             </a>
//             <a
//               href="https://youtube.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:scale-110 transition-transform duration-300"
//             >
//               <FaYoutube size={24} className="hover:text-red-600" />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:scale-110 transition-transform duration-300"
//             >
//               <FaInstagram size={24} className="hover:text-pink-500" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="my-8 border-t border-black opacity-30"></div>

//       {/* Bottom row */}
//       <div className="text-center text-sm">
//         <p>© {new Date().getFullYear()} - All rights reserved by <span className="font-bold">Team Diamond Ltd</span></p>
//       </div>

//       {/* Scroll to top button */}
//       <button
//         onClick={scrollToTop}
//         className="absolute right-6 bottom-6 bg-black text-white p-3 rounded-full hover:bg-gray-700 transition"
//         aria-label="Scroll to top"
//       >
//         <FaArrowUp size={16} />
//       </button>
//     </footer>
//   );
// };

// export default Footer;