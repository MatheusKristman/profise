const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
  },
  subCategory: {
    type: Array,
  },
});

const categorySchema = mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  subCategory: [subCategorySchema],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
