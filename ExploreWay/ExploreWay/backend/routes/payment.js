// routes/payment.js
import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Valid amount is required" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    console.log("✅ Razorpay Order Created:", order);

    return res.status(200).json(order);
  } catch (error) {
    console.error(" Razorpay Order Creation Error:", error);
    return res.status(500).json({
      error: error?.error?.description || "Failed to create Razorpay order",
    });
  }
});

export default router;
