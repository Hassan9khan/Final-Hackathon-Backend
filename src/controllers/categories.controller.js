import Category from "../models/categories.models.js";

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, subcategories, maxLoan, loanPeriod } = req.body;
    console.log(req.body);
    
    if (!name || !subcategories || !maxLoan || !loanPeriod) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const category = new Category({ name, subcategories, maxLoan, loanPeriod });
    await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully!", category });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories." });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, subcategories, maxLoan, loanPeriod } = req.body;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name, subcategories, maxLoan, loanPeriod },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    res
      .status(200)
      .json({ message: "Category updated successfully!", category });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
