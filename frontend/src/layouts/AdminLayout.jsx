import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import { toast } from "react-toastify";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (!token) {
      toast.error("Please login to access admin panel");
      navigate("/login");
      return;
    }

    if (user?.role !== "admin") {
      toast.error("You do not have permission to access admin panel");
      navigate("/");
      return;
    }
  }, [token, user, navigate]);

  if (!token || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? "2px" : "80px",
          transition: "margin 0.3s",
        }}
      >
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
