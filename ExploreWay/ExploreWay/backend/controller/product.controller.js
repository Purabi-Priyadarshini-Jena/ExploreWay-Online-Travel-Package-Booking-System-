 
import Product from "../model/product.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const { location, category, photo, description, night, ratings, persons,extraInfo } = req.body;
    const newProduct = await Product.create({ location, category, photo, description, night, ratings, persons,extraInfo });
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { location, category, photo, description, night, ratings } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { location, category, photo, description, night, ratings },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};