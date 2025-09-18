// routes/product.js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/product", createProduct);
router.get("/allproduct", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
