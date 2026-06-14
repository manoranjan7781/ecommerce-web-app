import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          🛒 E-Commerce Store
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
              🛒 Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="dropdown">
                <button
                  className="dropdown-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  👤 {user.name} ▾
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/dashboard" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                      Dashboard
                    </Link>
                    <Link to="/orders" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                      My Orders
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                        Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
