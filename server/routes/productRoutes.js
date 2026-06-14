import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getCategories,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('image').notEmpty().withMessage('Image URL is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

// Public routes (specific routes before :id)
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', protect, authorize('admin'), productValidation, validate, createProduct);
router.put('/:id', protect, authorize('admin'), productValidation, validate, updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;
