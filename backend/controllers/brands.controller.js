import asyncHandler from '../middleware/asyncHandler.js';
import Brand from '../models/Brand.model.js';

// @desc        Create new brand
// @route       POST /api/brands
// @access      Private/Admin
const createBrand = asyncHandler(async (req, res) => {
  const { name, link } = req.body;
  const brand = new Brand({ name, link });
  const createdBrand = await brand.save();
  res.status(201).json(createdBrand);
});

// @desc        Fetch all brands
// @route       GET /api/brands
// @access      Public
const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({});
  res.status(200).json(brands);
});

// @desc        Fetch brand by ID
// @route       GET /api/brands/:id
// @access      Public
const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    res.status(200).json(brand);
  } else {
    res.status(404);
    throw new Error('Brand not found');
  }
});

// @desc        Update brand
// @route       PUT /api/brands/:id
// @access      Private/Admin
const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    brand.name = req.body.name || brand.name;
    brand.link = req.body.link || brand.link;

    const updatedBrand = await brand.save();
    res.status(202).json({
      _id: updatedBrand._id,
      name: updatedBrand.name,
      link: updatedBrand.link,
    });
  } else {
    res.status(404);
    throw new Error('Brand not found');
  }
});

// @desc        Delete brand
// @route       DELETE /api/brands/:id
// @access      Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    await brand.deleteOne();
    res.status(204).json({
      message: 'Brand deleted successfully',
    });
  } else {
    res.status(404);
    throw new Error('Brand not found');
  }
});

export { createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand };
