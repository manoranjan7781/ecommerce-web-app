import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, categoriesRes] = await Promise.all([
          productAPI.getFeatured(),
          productAPI.getCategories(),
        ]);
        setFeaturedProducts(featuredRes.data.data);
        setCategories(categoriesRes.data.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categoryIcons = {
    Electronics: '💻',
    Clothing: '👕',
    Books: '📚',
    Home: '🏠',
    Sports: '⚽',
    Beauty: '💄',
    Other: '📦',
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Welcome to E-Commerce Store</h1>
          <p>Discover amazing products at unbeatable prices. Shop the latest trends today!</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <Loading />
          ) : (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-3">
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/products?category=${cat._id}`}
                className="category-card"
              >
                <span className="category-icon">{categoryIcons[cat._id] || '📦'}</span>
                <h3>{cat._id}</h3>
                <p>{cat.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
