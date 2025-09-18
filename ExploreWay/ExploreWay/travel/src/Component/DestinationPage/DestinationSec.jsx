import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const DestinationSec = () => {
  const [filter, setFilter] = useState('all');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const navigate =useNavigate()
  // Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:9009/api/v1/products/allproduct');
        const formattedData = response.data.map(dest => ({
          id: dest._id,
          name: dest.name || "Unnamed Destination",
          location: dest.location || "Unknown",
          night: dest.night || "N/A",
          rating: dest.ratings || 0,
          category: dest.category?.toLowerCase() || "uncategorized",
          image: dest.photo || "https://via.placeholder.com/300?text=No+Image",
        }));
        setDestinations(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  // Filter destinations
  useEffect(() => {
    const results = destinations.filter(dest =>
      (filter === 'all' || dest.category === filter) &&
      (location === '' || dest.location.toLowerCase().includes(location.toLowerCase())) &&
      (budget === '' || parseFloat(dest.night) <= parseFloat(budget))
    );
    setFilteredDestinations(results);
  }, [filter, location, budget, destinations]);

const gotoDestination =(id)=>{
navigate(`/explore/${id}`)
}

  // Add new destination
  // const handleAddDestination = (newDestination) => {
  //   const formatted = {
  //     id: newDestination._id,
  //     name: newDestination.name || "Unnamed Destination",
  //     location: newDestination.location || "Unknown",
  //     night: newDestination.night || "N/A",
  //     rating: newDestination.ratings || 0,
  //     category: newDestination.category?.toLowerCase() || "uncategorized",
  //     image: newDestination.photo || "https://via.placeholder.com/300?text=No+Image",
  //   };

  //   const updated = [...destinations, formatted];
  //   setDestinations(updated);
  // };

  if (loading) return <p className="text-center text-gray-600">Loading destinations...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className='bg-gradient-to-b bg-sky-100 backdrop-blur-md rounded-lg shadow-md p-4'>
      <div className='text-center mb-8'>
        {/* <h2 className='text-orange-500 font-semibold'>EXPLORE NOW</h2> */}
        <h1 className='text-3xl md:text-4xl font-bold tracking-wide'>Find Your Dream Destination</h1>
        <p className='text-lg md:text-xl mt-2'>Fill in the fields below to find the best spot for your next tour.</p>
      </div>

      {/* Search Filters */}
      <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-8 items-center mb-6'>
        <div className='relative bg-orange-200 flex items-center rounded-3xl w-full md:w-60 px-3 py-2'>
          <FaLocationDot className='text-gray-600' />
          <input
            type="text"
            placeholder='Location'
            className='bg-transparent flex-1 pl-3 outline-none text-black'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='relative bg-orange-200 flex items-center rounded-3xl w-full md:w-60 px-3 py-2'>
          <input
            type="number"
            placeholder='Budget'
            className='bg-transparent flex-1 pl-3 outline-none text-black'
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <button
          className='bg-orange-600 text-white flex items-center justify-center rounded-3xl w-full md:w-40 px-4 py-2 hover:bg-orange-500 transition'
        >
          <IoSearch className='mr-2' /> Search
        </button>
      </div>

      {/* Filter Buttons */}
      <div className='flex justify-center flex-wrap gap-4 mb-8'>
        {['all', 'beach', 'garden', 'historical', 'cultural', 'spiritual', 'mountains', 'island', 'sky'].map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-3xl font-medium transition ${filter === category ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Scrollable Destination Cards */}
      <div className="h-[750px] overflow-y-auto pr-2">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map(item => (
              <div
                key={item.id}
                className="w-[350px] h-[350px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out mx-auto flex flex-col"
              >
                <img src={item.image} alt={item.name || "Destination"} className="w-full h-40 object-cover" />

                <div className="flex flex-col flex-1 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {item.name !== "Unnamed Destination" ? item.name : (item.location || "Destination")}
                    </h3>
                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full capitalize">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                    <FaLocationDot className="inline text-orange-500 mr-1" />
                    {item.location}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base font-medium text-gray-700">₹{item.night} / Night</span>
                    <span className="flex items-center bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
                      <FaStar className="text-yellow-500 mr-1" /> {item.rating}
                    </span>
                  </div>

                  <div className="mt-auto flex justify-center">
                    <div
                      // to={`/explore/${item.id}`}
                      onClick={()=>gotoDestination(item.id)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition"
                    >
                      Explore Now
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No destinations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationSec;