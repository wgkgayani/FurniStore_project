import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cart,
  People,
  BoxSeam,
  CurrencyDollar,
  GraphUp,
  ArrowUp,
  ArrowDown,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "react-bootstrap-icons";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalRevenue: 45231,
    totalOrders: 1234,
    totalProducts: 156,
    totalUsers: 2345,
    pendingOrders: 45,
    completedOrders: 890,
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      id: "#CBC12345",
      customer: "John Doe",
      amount: 299,
      status: "pending",
      date: "2024-03-15",
    },
    {
      id: "#CBC12346",
      customer: "Jane Smith",
      amount: 599,
      status: "shipped",
      date: "2024-03-14",
    },
    {
      id: "#CBC12347",
      customer: "Bob Wilson",
      amount: 149,
      status: "delivered",
      date: "2024-03-14",
    },
    {
      id: "#CBC12348",
      customer: "Alice Brown",
      amount: 899,
      status: "pending",
      date: "2024-03-13",
    },
    {
      id: "#CBC12349",
      customer: "Charlie Davis",
      amount: 429,
      status: "processing",
      date: "2024-03-13",
    },
  ]);

  // Chart data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 22000, 18000, 25000],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const ordersData = {
    labels: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        data: [45, 32, 28, 890, 67],
        backgroundColor: [
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="text-warning" />;
      case "processing":
        return <Truck className="text-info" />;
      case "shipped":
        return <Truck className="text-primary" />;
      case "delivered":
        return <CheckCircle className="text-success" />;
      case "cancelled":
        return <XCircle className="text-danger" />;
      default:
        return <Clock />;
    }
  };

  const StatCard = ({ title, value, icon: Icon, change, color }) => (
    <motion.div whileHover={{ y: -5 }} className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className={`bg-${color} bg-opacity-10 p-3 rounded-3`}>
            <Icon size={24} className={`text-${color}`} />
          </div>
          <span
            className={`text-${change > 0 ? "success" : "danger"} d-flex align-items-center`}
          >
            {change > 0 ? <ArrowUp /> : <ArrowDown />}
            {Math.abs(change)}%
          </span>
        </div>
        <h3 className="mb-1">${value.toLocaleString()}</h3>
        <p className="text-muted mb-0">{title}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="container-fluid p-4">
      <h4 className="mb-4">Dashboard</h4>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            icon={CurrencyDollar}
            change={12.5}
            color="success"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={Cart}
            change={8.2}
            color="primary"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={BoxSeam}
            change={5.7}
            color="info"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={People}
            change={15.3}
            color="warning"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-4">
              <h6 className="mb-0">Revenue Overview</h6>
            </div>
            <div className="card-body">
              <Line data={revenueData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-4">
              <h6 className="mb-0">Order Status</h6>
            </div>
            <div className="card-body">
              <Doughnut data={ordersData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Recent Orders</h6>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate("/admin/orders")}
            >
              View All
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                    </td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>${order.amount}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          order.status === "pending"
                            ? "warning"
                            : order.status === "shipped"
                              ? "info"
                              : order.status === "delivered"
                                ? "success"
                                : "secondary"
                        }`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ms-1">{order.status}</span>
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
