import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Layout/Navbar.jsx";

const TripSec = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTrip, setEditingTrip] = useState(null);
  const [editForm, setEditForm] = useState({ persons: "", nights: "" });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:9009/api/v1/trips/my-trips",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrips(data.trips || []);
      } catch (err) {
        setError("Failed to load trips.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setEditForm({
      persons: trip.persons,
      nights: trip.nights,
    });
  };

  const handleDelete = async (trip) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9009/api/v1/trips/deleteTrip/${trip._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTrips((prev) => prev.filter((t) => t._id !== trip._id));
      alert(`Refund of ₹${trip.amount} successful!`);
    } catch (error) {
      console.error("Failed to Delete Booking", error);
      alert("Failed to delete booking.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        persons: Number(editForm.persons),
        nights: Number(editForm.nights),
      };

      await axios.put(
        `http://localhost:9009/api/v1/trips/updateTrip/${editingTrip._id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTrips((prev) =>
        prev.map((trip) =>
          trip._id === editingTrip._id ? { ...trip, ...payload } : trip
        )
      );
      setEditingTrip(null);
    } catch (err) {
      alert("Failed to update trip.");
      console.error(err);
    }
  };

  if (loading)
    return <div className="p-6 text-center text-lg">Loading your trips...</div>;

  if (error)
    return <div className="p-6 text-red-500 text-center mt-20 text-2xl">{error}</div>;

  return (
    <>
      <Navbar />

      {/* ✅ Video Background Section */}
      <div className="relative min-h-screen pt-24">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://static.vecteezy.com/system/resources/previews/007/433/346/mp4/close-up-waves-on-sunset-travel-destinations-free-video.mp4"
            type="video/mp4"
          />
           
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-0"></div>

        {/* Content */}
        <div className="relative z-10 px-6 pb-12 text-white min-h-screen">
          <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 via-pink-500 to-orange-400 text-transparent bg-clip-text mt-5">
            My Booked Trips
          </h2>

          {trips.length === 0 ? (
            <p className="text-center text-white">
              You haven’t booked any trips yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 px-4">
              {trips.map((trip) => (
                <div
                  key={trip._id}
                  className="bg-white text-black border border-gray-200 rounded-xl shadow-md p-4 w-full max-w-xs mx-auto flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-1">
                      {trip.location}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Booked on: {new Date(trip.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 text-sm">👥 Persons: {trip.persons}</p>
                    <p className="text-gray-700 text-sm">🌙 Nights: {trip.nights}</p>
                    <p className="text-gray-700 text-sm">📧 {trip.email}</p>
                    <p className="text-green-600 font-bold mt-1 text-lg">
                      ₹ {trip.amount}
                    </p>
                  </div>

                  <div className="flex gap-2 justify-center mt-3">
                    <button
                      onClick={() => handleEdit(trip)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md font-bold text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trip)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-bold text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Modal */}
          {editingTrip && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <form
                onSubmit={handleEditSubmit}
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm"
              >
                <h3 className="text-xl font-bold mb-4">
                  Edit Booking – {editingTrip.location}
                </h3>

                <label className="block mb-2 text-black sm font-medium">Persons:</label>
                <input
                  type="number"               
                  value={editForm.persons}
                  onChange={(e) =>
                    setEditForm({ ...editForm, persons: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                  required
                />

                <label className="block mb-2 text-black sm font-medium">Nights:</label>
                <input
                  type="number"
                  value={editForm.nights}
                  onChange={(e) =>
                    setEditForm({ ...editForm, nights: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                  required
                />

                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setEditingTrip(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TripSec;
