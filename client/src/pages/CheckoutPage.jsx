import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount: cartTotal,
        shippingAddress: formData,
      };

      await orderAPI.create(orderData);
      clearCart();
      navigate('/orders', { state: { message: 'Order placed successfully!' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="checkout-layout">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Shipping Address</h2>
            <div className="form-group">
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                placeholder="123 Main St"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="New York"
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="NY"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  placeholder="10001"
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  placeholder="United States"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p className="text-muted">Qty: {item.quantity}</p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
