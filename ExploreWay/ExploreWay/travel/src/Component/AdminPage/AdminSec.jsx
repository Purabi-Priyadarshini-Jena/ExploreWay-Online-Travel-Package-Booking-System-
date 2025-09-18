// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { MdCreateNewFolder, MdDeleteOutline } from "react-icons/md";
// import { FcAddImage } from "react-icons/fc";
// import toast from "react-hot-toast";

// const AdminSec = () => {
//   const [cardData, setCardData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch stories
//   const fetchStories = () => {
//     axios
//       .get("http://localhost:9009/api/v1/products/allproduct")
//       .then((response) => {
//         setCardData(response.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         toast.error("Error fetching products!");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchStories();
//     const interval = setInterval(fetchStories, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:9009/api/v1/products/${id}`)
//       .then(() => {
//         setCardData((prevData) => prevData.filter((item) => item._id !== id));
//         toast.success("Product deleted successfully!");
//       })
//       .catch(() => toast.error("Failed to delete product!"));
//   };

//   if (loading) {
//     return <div className="text-center mt-10 text-gray-600 text-lg">Loading products...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//     {/* Add Button Centered */}
//     <div className="flex justify-center mt-12 mb-8">
//       <Link
//         to="/add"
//         className="bg-white rounded-full p-6 hover:scale-110 transition-transform duration-300"
//         title="Add New Trip"
//       >
//         <FcAddImage className="text-5xl" />
//       </Link>
//     </div>

//       {/* Product Grid */}
//       <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//         {cardData.length > 0 ? (
//           cardData.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white shadow-lg rounded-xl overflow-hidden relative group transition-transform transform hover:scale-[1.02]"
//             >
//               {/* Image + Icons */}
//               <div className="relative h-48 sm:h-56 md:h-64 bg-gray-100">
//                 {item.photo ? (
//                   <img
//                     src={item.photo}
//                     alt={item.title}
//                     className="w-full h-full object-cover cursor-pointer"
//                     onClick={() =>
//                       navigate(`/product/${item._id}`, { state: { product: item } })
//                     }
//                   />
//                 ) : (
//                   <div
//                     className="w-full h-full flex items-center justify-center cursor-pointer"
//                     onClick={() =>
//                       navigate(`/product/${item._id}`, { state: { product: item } })
//                     }
//                   >
//                     <FcAddImage className="text-7xl sm:text-8xl text-gray-400" />
//                   </div>
//                 )}

//                 {/* Action Icons */}
//                 <div className="absolute top-3 right-3 flex space-x-3 z-10">
//                   <MdCreateNewFolder
//                     className="text-3xl text-blue-600 hover:text-blue-800 cursor-pointer"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate(`/edit/${item._id}`, { state: { product: item } });
//                       toast.success("Editing product...");
//                     }}
//                   />
//                   <MdDeleteOutline
//                     className="text-3xl text-red-600 hover:text-red-800 cursor-pointer"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(item._id);
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500 text-lg col-span-full">
//             No products found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminSec;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdCreateNewFolder, MdDeleteOutline } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import toast from "react-hot-toast";

const AdminSec = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch stories
  const fetchStories = () => {
    axios
      .get("http://localhost:9009/api/v1/products/allproduct")
      .then((response) => {
        setCardData(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching products!");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStories();
    const interval = setInterval(fetchStories, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9009/api/v1/products/${id}`)
      .then(() => {
        setCardData((prevData) => prevData.filter((item) => item._id !== id));
        toast.success("Product deleted successfully!");
      })
      .catch(() => toast.error("Failed to delete product!"));
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600 text-lg">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
    {/* Add Button Centered */}
    <div className="flex justify-center mt-12 mb-8">
      <Link
        to="/add"
        className="bg-white rounded-full p-6 hover:scale-110 transition-transform duration-300"
        title="Add New Trip"
      >
        <FcAddImage className="text-5xl" />
      </Link>
    </div>

      {/* Product Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {cardData.length > 0 ? (
          cardData.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden relative group transition-transform transform hover:scale-[1.02]"
            >
              {/* Image + Icons */}
              <div className="relative h-48 sm:h-56 md:h-64 bg-gray-100">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() =>
                      navigate(`/product/${item._id}`, { state: { product: item } })
                    }
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                    onClick={() =>
                      navigate(`/product/${item._id}`, { state: { product: item } })
                    }
                  >
                    <FcAddImage className="text-7xl sm:text-8xl text-gray-400" />
                  </div>
                )}

                {/* Action Icons */}
                <div className="absolute top-3 right-3 flex space-x-3 z-10">
                  <MdCreateNewFolder
                    className="text-3xl text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${item._id}`, { state: { product: item } });
                      toast.success("Editing product...");
                    }}
                  />
                  <MdDeleteOutline
                    className="text-3xl text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg col-span-full">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSec;