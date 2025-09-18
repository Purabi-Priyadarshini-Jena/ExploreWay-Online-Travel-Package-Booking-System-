// routes/trip.js
import express from "express";
import authMiddleware from "../middleware/auth.js";
import { saveTrip, getMyTrips,deleteTripById,updateTripById } from "../controller/trip.controller.js";

const router = express.Router();

router.post("/save", authMiddleware, saveTrip);
router.get("/my-trips", authMiddleware, getMyTrips);
router.delete("/deleteTrip/:id", authMiddleware, deleteTripById); 
router.put("/updateTrip/:id", authMiddleware, updateTripById);



export default router;
