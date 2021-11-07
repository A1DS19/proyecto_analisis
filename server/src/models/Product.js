const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    isDiscounted: {
      type: Boolean,
      default: false,
    },
    discountedPrice: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      required: true,
      type: String,
    },
    selectedQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = { Product, ProductSchema };
