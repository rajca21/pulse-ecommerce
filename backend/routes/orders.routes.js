import { Router } from 'express';
import * as ordersController from '../controllers/orders.controller.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router.route('/').post(authMiddleware.protect, ordersController.addOrderItems);

// GET Endpoints
router
  .route('/')
  .get(
    authMiddleware.protect,
    authMiddleware.admin,
    ordersController.getAllOrders
  );
router.route('/mine').get(authMiddleware.protect, ordersController.getMyOrders);
router.route('/:id').get(authMiddleware.protect, ordersController.getOrderById);

// PUT Endpoints
router
  .route('/:id/pay')
  .put(authMiddleware.protect, ordersController.updateOrderToPaid);
router
  .route('/:id/deliver')
  .put(
    authMiddleware.protect,
    authMiddleware.admin,
    ordersController.updateOrderToDelivered
  );
export default router;
