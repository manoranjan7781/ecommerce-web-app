import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

const orderValidation = [
  body('products').isArray({ min: 1 }).withMessage('Order must contain at least one product'),
  body('totalAmount').isFloat({ min: 0 }).withMessage('Total amount is required'),
  body('shippingAddress.street').notEmpty().withMessage('Street is required'),
  body('shippingAddress.city').notEmpty().withMessage('City is required'),
  body('shippingAddress.state').notEmpty().withMessage('State is required'),
  body('shippingAddress.zipCode').notEmpty().withMessage('Zip code is required'),
  body('shippingAddress.country').notEmpty().withMessage('Country is required'),
];

router.post('/', protect, orderValidation, validate, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);

export default router;
