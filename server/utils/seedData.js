import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 50,
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and water resistance.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    stock: 30,
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket made from premium cotton with a comfortable fit for all seasons.',
    price: 79.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93de?w=400',
    stock: 45,
  },
  {
    name: 'Running Shoes Ultra',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 129.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    stock: 60,
  },
  {
    name: 'JavaScript: The Good Parts',
    description: 'Essential guide to JavaScript programming by Douglas Crockford. A must-read for developers.',
    price: 29.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    stock: 100,
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic mugs perfect for your morning coffee or tea ritual.',
    price: 34.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca0d?w=400',
    stock: 75,
  },
  {
    name: 'Organic Face Moisturizer',
    description: 'Natural organic moisturizer with SPF 30 protection. Suitable for all skin types.',
    price: 24.99,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    stock: 80,
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip eco-friendly yoga mat with extra cushioning for comfortable practice.',
    price: 49.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    stock: 40,
  },
  {
    name: 'Laptop Stand Adjustable',
    description: 'Ergonomic aluminum laptop stand with adjustable height for better posture.',
    price: 59.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    stock: 35,
  },
  {
    name: 'Cotton T-Shirt Pack',
    description: 'Pack of 3 premium cotton t-shirts available in multiple colors. Soft and durable.',
    price: 39.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    stock: 90,
  },
  {
    name: 'Desk Lamp LED',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature settings.',
    price: 44.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed229f782e?w=400',
    stock: 55,
  },
  {
    name: 'React Development Guide',
    description: 'Comprehensive guide to building modern web applications with React and its ecosystem.',
    price: 34.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1532012197268-da468d04e104?w=400',
    stock: 65,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@store.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`Admin created: ${admin.email}`);

    // Create sample user
    const user = await User.create({
      name: 'John Doe',
      email: 'user@store.com',
      password: 'user123',
      role: 'user',
    });
    console.log(`User created: ${user.email}`);

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`${products.length} products inserted`);

    console.log('\n--- Seed Data Summary ---');
    console.log('Admin Login: admin@store.com / admin123');
    console.log('User Login:  user@store.com / user123');
    console.log('-------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
