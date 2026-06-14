import Product from '../models/Product.js';

/**
 * @desc    Get all products with search, filter, and sort
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  const { search, category, sort, page = 1, limit = 12 } = req.query;

  const query = {};

  // Search by name or description
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // Filter by category
  if (category && category !== 'All') {
    query.category = category;
  }

  // Sort options
  let sortOption = {};
  if (sort === 'price-asc') sortOption = { price: 1 };
  else if (sort === 'price-desc') sortOption = { price: -1 };
  else if (sort === 'name') sortOption = { name: 1 };
  else sortOption = { createdAt: -1 };

  const skip = (Number(page) - 1) * Number(limit);

  const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  res.json({
    success: true,
    count: products.length,
    total,
    totalPages: Math.ceil(total / Number(limit)),
    currentPage: Number(page),
    data: products,
  });
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.json({ success: true, data: product });
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.json({ success: true, data: product });
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.json({ success: true, message: 'Product removed' });
};

/**
 * @desc    Get featured products (latest 4)
 * @route   GET /api/products/featured
 * @access  Public
 */
export const getFeaturedProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).limit(4);
  res.json({ success: true, data: products });
};

/**
 * @desc    Get product categories with counts
 * @route   GET /api/products/categories
 * @access  Public
 */
export const getCategories = async (req, res) => {
  const categories = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  res.json({ success: true, data: categories });
};
