import React, { useState, useEffect } from "react";
import { productAPI } from "../../services/api";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import ProductForm from "../../components/admin/ProductForm";
import {
  Plus,
  Pencil,
  Trash,
  Search,
  Eye,
  EyeSlash,
  ArrowUp,
  ArrowDown,
} from "react-bootstrap-icons";

// Helper function to safely format price
const formatPrice = (price) => {
  if (typeof price === "number" && !isNaN(price)) {
    return price.toFixed(2);
  }
  return "0.00";
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy, sortOrder]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let result = [...products];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.productId?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === "price" || sortBy === "stock") {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else {
        aVal = String(aVal || "").toLowerCase();
        bVal = String(bVal || "").toLowerCase();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredProducts(result);
  };

  const handleAddProduct = async (productData) => {
    try {
      await productAPI.create(productData);
      toast.success("Product added successfully");
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      await productAPI.update(productData.productId, productData);
      toast.success("Product updated successfully");
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productAPI.delete(productId);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete product",
        );
      }
    }
  };

  const toggleProductAvailability = async (product) => {
    try {
      await productAPI.update(product.productId, {
        ...product,
        isAvailable: !product.isAvailable,
      });
      toast.success(
        `Product ${product.isAvailable ? "disabled" : "enabled"} successfully`,
      );
      fetchProducts();
    } catch (error) {
      toast.error("Failed to update product status");
    }
  };

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Product Management</h4>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary d-flex align-items-center"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          <Plus className="me-2" />
          Add New Product
        </motion.button>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <Search />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="stock">Sort by Stock</option>
                <option value="productId">Sort by ID</option>
              </select>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                {sortOrder === "asc" ? (
                  <ArrowUp className="me-2" />
                ) : (
                  <ArrowDown className="me-2" />
                )}
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredProducts.map((product) => (
                      <motion.tr
                        key={product._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layout
                      >
                        <td>
                          <img
                            src={
                              product.images?.[0] ||
                              "https://via.placeholder.com/50"
                            }
                            alt={product.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                        </td>
                        <td>
                          <code>{product.productId}</code>
                        </td>
                        <td>
                          <strong>{product.name}</strong>
                          <br />
                          <small className="text-muted">
                            {product.description?.substring(0, 50)}...
                          </small>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {product.category || "Uncategorized"}
                          </span>
                        </td>
                        <td>
                          <strong className="text-primary">
                            ${formatPrice(product.price)}
                          </strong>
                          {product.labelledPrice &&
                            typeof product.labelledPrice === "number" &&
                            typeof product.price === "number" &&
                            product.labelledPrice > product.price && (
                              <>
                                <br />
                                <small className="text-muted text-decoration-line-through">
                                  ${formatPrice(product.labelledPrice)}
                                </small>
                              </>
                            )}
                        </td>
                        <td>
                          <span
                            className={`badge bg-${
                              product.stock > 10
                                ? "success"
                                : product.stock > 0
                                  ? "warning"
                                  : "danger"
                            }`}
                          >
                            {product.stock ?? 0}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${product.isAvailable ? "btn-success" : "btn-secondary"}`}
                            onClick={() => toggleProductAvailability(product)}
                          >
                            {product.isAvailable ? <Eye /> : <EyeSlash />}
                          </button>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => {
                                setEditingProduct(product);
                                setShowForm(true);
                              }}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleDeleteProduct(product.productId)
                              }
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-5">
                  <h6>No products found</h6>
                  <p className="text-muted">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onClose={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
