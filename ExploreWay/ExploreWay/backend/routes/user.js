// routes/user.js
import express from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.post("/Login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
