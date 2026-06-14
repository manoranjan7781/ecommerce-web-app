import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { orderAPI } from '../services/api';
import Loading from '../components/Loading';

const statusColors = {
  Pending: 'status-pending',
  Processing: 'status-processing',
  Shipped: 'status-shipped',
  Delivered: 'status-delivered',
  Cancelled: 'status-cancelled',
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const successMessage = location.state?.message;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderAPI.getAll();
        setOrders(data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="orders-page">
      <div className="container">
        <h1 className="page-title">My Orders</h1>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {orders.length === 0 ? (
          <div className="empty-state">
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <p className="order-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className={`status-badge ${statusColors[order.orderStatus]}`}>
                    {order.orderStatus}
                  </span>
                </div>

                <div className="order-items">
                  {order.products.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-muted">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-address">
                    <strong>Ship to:</strong>{' '}
                    {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                    {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </div>
                  <p className="order-total">Total: ${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
