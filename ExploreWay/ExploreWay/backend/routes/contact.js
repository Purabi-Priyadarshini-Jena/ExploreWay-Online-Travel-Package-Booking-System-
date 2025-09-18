import express from "express";
import { postContactMessage } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/", postContactMessage);

export default router;
