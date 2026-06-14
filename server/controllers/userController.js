import User from '../models/User.js';

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ success: true, data: user });
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.address) {
    user.address = { ...user.address, ...req.body.address };
  }

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      address: updatedUser.address,
    },
  });
};

/**
 * @desc    Get all users (admin only)
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, data: users });
};

/**
 * @desc    Delete user (admin only)
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  if (user.role === 'admin') {
    return res.status(400).json({ success: false, message: 'Cannot delete admin user' });
  }

  await user.deleteOne();
  res.json({ success: true, message: 'User removed' });
};
