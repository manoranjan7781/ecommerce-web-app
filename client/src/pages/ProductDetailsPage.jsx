import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productAPI.getById(id);
        setProduct(data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <Loading />;
  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <h2>Product not found</h2>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="container">
        <Link to="/products" className="back-link">&larr; Back to Products</Link>

        <div className="product-details">
          <div className="product-details-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-details-info">
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="product-price-lg">${product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock-text">Out of Stock</span>
              )}
            </p>

            {product.stock > 0 && (
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                  {added ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
