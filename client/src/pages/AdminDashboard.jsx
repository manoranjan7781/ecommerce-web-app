import { useState, useEffect } from 'react';
import { productAPI, orderAPI, userAPI } from '../services/api';
import Loading from '../components/Loading';

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Other'];
const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  category: 'Electronics',
  image: '',
  stock: '',
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyProduct);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        productAPI.getAll({ limit: 100 }),
        orderAPI.getAll(),
        userAPI.getAll(),
      ]);
      setProducts(productsRes.data.data);
      setOrders(ordersRes.data.data);
      setUsers(usersRes.data.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      if (editingProduct) {
        await productAPI.update(editingProduct._id, productData);
        setMessage('Product updated successfully!');
      } else {
        await productAPI.create(productData);
        setMessage('Product created successfully!');
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData(emptyProduct);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productAPI.delete(id);
      setMessage('Product deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleUpdateOrderStatus = async (orderId, orderStatus) => {
    try {
      await orderAPI.updateStatus(orderId, orderStatus);
      setMessage('Order status updated!');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await userAPI.delete(id);
      setMessage('User deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <Loading message="Loading admin dashboard..." />;

  return (
    <div className="admin-page">
      <div className="container">
        <h1 className="page-title">Admin Dashboard</h1>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{products.length}</h3>
            <p>Products</p>
          </div>
          <div className="stat-card">
            <h3>{orders.length}</h3>
            <p>Orders</p>
          </div>
          <div className="stat-card">
            <h3>{users.length}</h3>
            <p>Users</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>Manage Products</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingProduct(null);
                  setFormData(emptyProduct);
                }}
              >
                {showForm ? 'Cancel' : '+ Add Product'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleProductSubmit} className="admin-form">
                <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input name="name" value={formData.name} onChange={handleProductChange} required />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleProductChange}>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleProductChange}
                    required
                    rows={3}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleProductChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleProductChange}
                      required
                      min="0"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input name="image" value={formData.image} onChange={handleProductChange} required />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </form>
            )}

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td><img src={product.image} alt={product.name} className="table-img" /></td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <button className="btn btn-sm btn-outline" onClick={() => handleEditProduct(product)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(product._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="admin-section">
            <h2>Manage Orders</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-8).toUpperCase()}</td>
                      <td>{order.user?.name || 'N/A'}</td>
                      <td>{order.products.length} item(s)</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="status-select"
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="admin-section">
            <h2>Manage Users</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className="badge">{u.role}</span></td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>
                        {u.role !== 'admin' && (
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(u._id)}>
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
