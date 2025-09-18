// import mongoose from "mongoose";

// const prodSchema = new mongoose.Schema(
//   {
//     location: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       enum: [
//         "Mountains",
//         "Beach",
//         "Historical",
//         "Cultural",
//         "Spiritual",
//         "Garden",
//         "Island",
//       ],
//     },
//     image: {
//       type: String // single image filename or URL
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     night: {
//       type: Number,
//       required: true,
//     },
//     ratings: {
//       type: Number,
//       default: 0,
//     },
//     persons: {
//       type: Number,
//       default: 1,
//     },
//     extraInfo: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Product = mongoose.model("Product", prodSchema);
// export default Product;


// model/product.js
import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Mountains", "Beach", "Historical",
    "Cultural", "Spiritual", "Garden", "Island","sky"]
  },
  photo: { type: String },
  description: {
    type: String,
    required: true
  },
  night: {
    type: Number,
    required: true
  },
  ratings: {
    type: Number,
    default: 0
  },
  persons: {
    type: Number,
    default: 1
  },
  extraInfo:{
    type:String,
    default:""
  }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", prodSchema);
export default Product;