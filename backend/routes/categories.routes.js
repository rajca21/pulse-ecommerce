import { Router } from 'express';
import * as categoriesController from '../controllers/categories.controller.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router
  .route('/')
  .post(
    authMiddleware.protect,
    authMiddleware.admin,
    categoriesController.createCategory
  );

// GET Endpoints
router.route('/').get(categoriesController.getAllCategories);
router.route('/:id').get(categoriesController.getCategoryById);

// PUT Endpoints
router
  .route('/:id')
  .put(
    authMiddleware.protect,
    authMiddleware.admin,
    categoriesController.updateCategory
  );

// DELETE Endpoints
router
  .route('/:id')
  .delete(
    authMiddleware.protect,
    authMiddleware.admin,
    categoriesController.deleteCategory
  );

export default router;
