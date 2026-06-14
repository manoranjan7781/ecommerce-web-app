import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Other'];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'All';
  const sort = searchParams.get('sort') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productAPI.getAll({
          search,
          category: category === 'All' ? undefined : category,
          sort,
          page: currentPage,
          limit: 12,
        });
        setProducts(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category, sort, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSearch = formData.get('search');
    setCurrentPage(1);
    setSearchParams({ search: newSearch, category, sort });
  };

  const handleCategoryChange = (cat) => {
    setCurrentPage(1);
    setSearchParams({ search, category: cat, sort });
  };

  const handleSortChange = (e) => {
    setCurrentPage(1);
    setSearchParams({ search, category, sort: e.target.value });
  };

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">All Products</h1>

        {/* Filters */}
        <div className="filters">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              name="search"
              placeholder="Search products..."
              defaultValue={search}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

          <div className="filter-group">
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="filter-select"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select value={sort} onChange={handleSortChange} className="filter-select">
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="empty-state">
            <p>No products found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  className="btn btn-outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
