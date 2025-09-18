import dotenv from "dotenv";
dotenv.config(); // Always at top

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import paymentRoutes from "./routes/payment.js";
import tripRoutes from "./routes/trip.js";
import User from "./model/user.js";
import contactRoutes from "./routes/contact.js"

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/trips", tripRoutes);
app.use("/api/v1/contact", contactRoutes);

// Auto-create predefined Admin account
const createAdminIfNotExists = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn(" ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
    return;
  }

  const existingAdmin = await User.findOne({ email: adminEmail, role: "Admin" });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = new User({
      name: "Admin",
      email: adminEmail,
      mobile: 9999999999, // default admin mobile
      password: hashedPassword,
      role: "Admin",
    });

    await admin.save();
    console.log(" Admin account created");
  } else {
    console.log(" Admin already exists");
  }
};

// Connect DB and Start Server
mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log(" MongoDB Connected!");
    await createAdminIfNotExists(); //  Call after DB connection

    app.listen(9009, () => {
      console.log(" Server running at http://localhost:9009");
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
  });
