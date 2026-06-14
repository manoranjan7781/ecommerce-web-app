import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>🛒 E-Commerce Store</h3>
          <p>Your one-stop shop for quality products at great prices.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/products?category=Electronics">Electronics</Link></li>
            <li><Link to="/products?category=Clothing">Clothing</Link></li>
            <li><Link to="/products?category=Books">Books</Link></li>
            <li><Link to="/products?category=Sports">Sports</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@ecommerce-store.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
