import { Router } from 'express';
import * as usersController from '../controllers/users.controller.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

// POST Endpoints
router.route('/').post(usersController.registerUser);
router.route('/login').post(usersController.loginUser);
router.route('/logout').post(usersController.logoutUser);

// GET Endpoints
router
  .route('/')
  .get(authMiddleware.protect, authMiddleware.admin, usersController.getUsers);
router
  .route('/profile')
  .get(authMiddleware.protect, usersController.getUserProfile);
router
  .route('/:id')
  .get(
    authMiddleware.protect,
    authMiddleware.admin,
    usersController.getUserById
  );

// PUT Endpoints
router
  .route('/profile')
  .put(authMiddleware.protect, usersController.updateUserProfile);
router
  .route('/:id')
  .put(
    authMiddleware.protect,
    authMiddleware.admin,
    usersController.updateUser
  );

// DELETE Enpoints
router
  .route('/:id')
  .delete(
    authMiddleware.protect,
    authMiddleware.admin,
    usersController.deleteUser
  );

export default router;
