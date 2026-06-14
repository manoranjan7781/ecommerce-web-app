import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products yet.</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <Link to={`/products/${item._id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="btn-remove"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((c, i) => c + i.quantity, 0)} items)</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            {isAuthenticated ? (
              <Link to="/checkout" className="btn btn-primary btn-block">
                Proceed to Checkout
              </Link>
            ) : (
              <Link to="/login" state={{ from: { pathname: '/checkout' } }} className="btn btn-primary btn-block">
                Login to Checkout
              </Link>
            )}
            <Link to="/products" className="btn btn-outline btn-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
