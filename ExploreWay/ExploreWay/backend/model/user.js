// model/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already Exists"]
  },
  mobile: {
    type: Number,
    required: [true, "Mobile Number is required"],
    unique: [true, "Mobile Number is already Exists"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    enum: ["Admin", "User"]
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
