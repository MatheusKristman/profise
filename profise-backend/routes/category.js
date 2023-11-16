const express = require("express");
const { getAllCategories, createCategory, getSearchedCategory, findSelectedCategory } = require("../controllers/categoryController.js");

const router = express.Router();

router.get("/all-categories", getAllCategories);
router.get("/search-categories", getSearchedCategory);
router.post("/find-category", findSelectedCategory);
router.post("/create-category", createCategory);

module.exports = router;
