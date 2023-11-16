const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    requestAnswers: { type: Array },
    requesterLocation: {
      cep: { type: String, required: true },
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
    },
    requesterName: { type: String, required: true },
    requesterEmail: { type: String, required: true },
    requesterContact: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
