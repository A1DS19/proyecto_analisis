const mongoose = require('mongoose');
const { ProductSchema } = require('./Product');

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isDelivered: { type: Boolean, default: false },
    products: [ProductSchema],
    total: { type: Number },
    paymentMethod: { type: String },
    storePickup: { type: Boolean },
    orderId: { type: Number },
    address: {
      type: Object,
      default: null,
      provincia: { type: String },
      canton: { type: String },
      distrito: { type: String },
      direccionExacta: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order };
