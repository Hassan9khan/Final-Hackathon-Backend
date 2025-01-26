import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:categoryId", getCategoryById);
router.put("/categories/:categoryId", updateCategory);
router.delete("/categories/:categoryId", deleteCategory);

export default router   
