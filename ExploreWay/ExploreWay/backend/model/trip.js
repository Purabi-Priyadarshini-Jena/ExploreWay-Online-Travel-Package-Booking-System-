// models/Trip.js
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  persons: {
    type: Number,
    required: true,
  },
  nights: {
    type: Number,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentId: String,
  orderId: String,
  signature: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Trip", tripSchema);
