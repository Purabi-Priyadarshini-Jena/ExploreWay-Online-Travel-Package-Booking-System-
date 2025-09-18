// controller/trip.controller.js
import Trip from "../model/trip.js";

// Save trip
export const saveTrip = async (req, res) => {
  const {
    product, persons, nights, fullName,
    mobile, email, amount, paymentId, orderId, signature
  } = req.body;

  try {
    const trip = await Trip.create({
      user: req.user.id,
      location: product?.location || "Unknown",
      persons,
      nights,
      fullName,
      mobile,
      email,
      amount,
      paymentId,
      orderId,
      signature,
    });

    res.status(201).json({ success: true, trip });
  } catch (error) {
    console.error("❌ Trip Save Error:", error);
    res.status(500).json({ success: false, message: "Failed to save trip" });
  }
};

// Get trips of user
export const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, trips });
  } catch (error) {
    console.error("❌ Fetch Trips Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch trips" });
  }
};


export const deleteTripById= async (req,res)=>{
     try {
        const {id}=req.params;
        const deletedTrip=await Trip.findByIdAndDelete(id);
        
        if(!deletedTrip){
            return res.status(404).json({
                success:true,
                message:"User Not Found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"User Deleted successfully",
            data:deletedTrip
        });
     } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.message
        })
     }
}

export const updateTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTrip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    return res.status(200).json({ success: true, data: updatedTrip });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
