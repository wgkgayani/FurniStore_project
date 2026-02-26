import React, { useState, useEffect } from "react";
import { orderAPI } from "../../services/api";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  BoxSeam,
  Printer,
  Download,
} from "react-bootstrap-icons";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, dateRange]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAllOrders();
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let result = [...orders];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (o) =>
          o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }

    // Date range filter
    if (dateRange !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      result = result.filter((o) => {
        const orderDate = new Date(o.date);

        switch (dateRange) {
          case "today":
            return orderDate >= today;
          case "week":
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return orderDate >= weekAgo;
          case "month":
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return orderDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    setFilteredOrders(result);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update order status",
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock />;
      case "processing":
        return <BoxSeam />;
      case "shipped":
        return <Truck />;
      case "delivered":
        return <CheckCircle />;
      case "cancelled":
        return <XCircle />;
      default:
        return <Clock />;
    }
  };

  const calculateTotal = (order) => {
    return (
      order.total ||
      order.products?.reduce(
        (sum, item) => sum + item.productInfo.price * item.quantity,
        0,
      ) ||
      0
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const OrderDetailsModal = ({ order, onClose }) => (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Order Details - {order.orderId}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-4">
              <div className="col-md-6">
                <h6>Customer Information</h6>
                <p className="mb-1">
                  <strong>Name:</strong> {order.name}
                </p>
                <p className="mb-1">
                  <strong>Email:</strong> {order.email}
                </p>
                <p className="mb-1">
                  <strong>Phone:</strong> {order.phone}
                </p>
              </div>
              <div className="col-md-6">
                <h6>Shipping Address</h6>
                <p className="mb-1">{order.address}</p>
                <p className="mb-1">
                  {order.city}, {order.postalCode}
                </p>
              </div>
            </div>

            <h6>Order Items</h6>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={
                              item.productInfo.images?.[0] ||
                              "https://via.placeholder.com/40"
                            }
                            alt={item.productInfo.name}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                            }}
                            className="me-2 rounded"
                          />
                          {item.productInfo.name}
                        </div>
                      </td>
                      <td>${item.productInfo.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        ${(item.productInfo.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Subtotal:</strong>
                    </td>
                    <td>${calculateTotal(order).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Shipping:</strong>
                    </td>
                    <td>${order.shipping || 10}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Total:</strong>
                    </td>
                    <td>
                      <strong className="text-primary">
                        $
                        {(
                          calculateTotal(order) + (order.shipping || 10)
                        ).toFixed(2)}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-4">
              <h6>Update Order Status</h6>
              <div className="d-flex gap-2">
                {[
                  "pending",
                  "processing",
                  "shipped",
                  "delivered",
                  "cancelled",
                ].map((status) => (
                  <button
                    key={status}
                    className={`btn btn-sm btn-${getStatusColor(status)} ${order.status === status ? "active" : ""}`}
                    onClick={() => {
                      updateOrderStatus(order.orderId, status);
                      onClose();
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Order Management</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            <Printer className="me-2" />
            Print
          </button>
          <button className="btn btn-outline-success">
            <Download className="me-2" />
            Export
          </button>
        </div>
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
                  placeholder="Search by order ID, customer, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            <div className="col-md-2">
              <span className="badge bg-primary p-3 w-100">
                {filteredOrders.length} Orders
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
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
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredOrders.map((order) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layout
                      >
                        <td>
                          <code>{order.orderId}</code>
                        </td>
                        <td>{formatDate(order.date)}</td>
                        <td>
                          <strong>{order.name}</strong>
                          <br />
                          <small className="text-muted">{order.email}</small>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {order.products?.length || 0} items
                          </span>
                        </td>
                        <td>
                          <strong className="text-primary">
                            ${calculateTotal(order).toFixed(2)}
                          </strong>
                        </td>
                        <td>
                          <span
                            className={`badge bg-${getStatusColor(order.status)}`}
                          >
                            {getStatusIcon(order.status)}
                            <span className="ms-1">{order.status}</span>
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowOrderDetails(true);
                            }}
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-5">
                  <h6>No orders found</h6>
                  <p className="text-muted">Try adjusting your filters</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetails && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => {
              setShowOrderDetails(false);
              setSelectedOrder(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;
