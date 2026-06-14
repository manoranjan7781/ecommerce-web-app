import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Other'],
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
