import { Router } from 'express';
import * as productsController from '../controllers/products.controller.js';
import * as authMiddleware from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjecId.js';

const router = Router();

// POST Endpoints
router
  .route('/')
  .post(
    authMiddleware.protect,
    authMiddleware.admin,
    productsController.createProduct
  );
router
  .route('/:id/reviews')
  .post(
    authMiddleware.protect,
    checkObjectId,
    productsController.createProductReview
  );

// GET Endpoints
router.route('/').get(productsController.getProducts);
router.route('/top').get(productsController.getTopProducts);
router.route('/:id').get(checkObjectId, productsController.getProductById);

// PUT Endpoints
router
  .route('/:id')
  .put(
    authMiddleware.protect,
    authMiddleware.admin,
    checkObjectId,
    productsController.updateProduct
  );

// DELETE Endpoints
router
  .route('/:id')
  .delete(
    authMiddleware.protect,
    authMiddleware.admin,
    checkObjectId,
    productsController.deleteProduct
  );

export default router;
