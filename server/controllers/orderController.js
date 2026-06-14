import Order from '../models/Order.js';
import Product from '../models/Product.js';

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req, res) => {
  const { products, shippingAddress, totalAmount } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ success: false, message: 'No order items' });
  }

  // Verify stock and build order items
  const orderItems = [];
  for (const item of products) {
    const product = await Product.findById(item.product);
    if (!product) {
      return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
    }
    if (product.stock < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${product.name}`,
      });
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
    });

    // Reduce stock
    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    user: req.user._id,
    products: orderItems,
    totalAmount,
    shippingAddress,
  });

  const populatedOrder = await Order.findById(order._id).populate('user', 'name email');

  res.status(201).json({ success: true, data: populatedOrder });
};

/**
 * @desc    Get all orders (admin) or user's orders
 * @route   GET /api/orders
 * @access  Private
 */
export const getOrders = async (req, res) => {
  let query = {};

  // Non-admin users only see their own orders
  if (req.user.role !== 'admin') {
    query.user = req.user._id;
  }

  const orders = await Order.find(query)
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: orders.length, data: orders });
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  // Users can only view their own orders unless admin
  if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }

  res.json({ success: true, data: order });
};

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.orderStatus = orderStatus;
  await order.save();

  res.json({ success: true, data: order });
};
