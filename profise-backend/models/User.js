const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  cpf: { type: String },
  tel: { type: String },
  cel: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String },
  cep: { type: String },
  address: { type: String },
  addressNumber: { type: String },
  city: { type: String },
  state: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  district: { type: String },
  complement: { type: String },
  aboutMe: { type: String },
  company: { type: String },
  profileImage: { type: String },
  twitter: { type: String },
  facebook: { type: String },
  googlePlus: { type: String },
  linkedin: { type: String },
  accountType: {
    type: String,
    enum: ["professional", "client"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pre-active", "active", "desactive"],
    required: true,
  },
  service: {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    categoryName: {
      type: String,
    },
    subcategory: {
      type: String,
    },
  },
  coins: {
    type: Number,
    default: 0,
  },
  ordersBuyed: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
      createdAt: { type: Date },
      isConcluded: { type: Boolean, default: false },
      orderReview: {
        rate: { type: Number },
        details: { type: String },
        name: { type: String },
      },
    },
  ],
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
