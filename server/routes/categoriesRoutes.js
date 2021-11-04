const express = require("express");

const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesControllers");

router.get("/data", getCategories);
router.post("/", createCategory);
router.post("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
