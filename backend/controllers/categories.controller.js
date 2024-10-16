import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/Category.model.js';

// @desc        Create new category
// @route       POST /api/categories
// @access      Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc        Fetch all categories
// @route       GET /api/categories
// @access      Public
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});

// @desc        Fetch category by ID
// @route       GET /api/categories/:id
// @access      Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc        Update category
// @route       PUT /api/categories/:id
// @access      Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = req.body.name || category.name;

    const updatedCategory = await category.save();
    res.status(202).json({
      _id: updatedCategory._id,
      name: updatedCategory.name,
    });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc        Delete category
// @route       DELETE /api/categories/:id
// @access      Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.deleteOne();
    res.status(204).json({
      message: 'Category deleted successfully',
    });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
