import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Speedometer2,
  BoxSeam,
  People,
  Gear,
  GraphUp,
  Cart,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
} from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: Speedometer2, label: "Dashboard" },
    { path: "/admin/products", icon: BoxSeam, label: "Products" },
    { path: "/admin/orders", icon: Cart, label: "Orders" },
    { path: "/admin/users", icon: People, label: "Users" },
    { path: "/admin/categories", icon: Grid, label: "Categories" },
    { path: "/admin/reports", icon: GraphUp, label: "Reports" },
    { path: "/admin/settings", icon: Gear, label: "Settings" },
  ];

  return (
    <motion.div
      initial={{ width: isOpen ? 280 : 80 }}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.3 }}
      className="admin-sidebar bg-dark text-white"
      style={{
        minHeight: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        overflowX: "hidden",
        zIndex: 1000,
      }}
    >
      <div className="p-3 d-flex align-items-center justify-content-between">
        <AnimatePresence>
          {isOpen && (
            <motion.h5
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white mb-0"
            >
              Admin Panel
            </motion.h5>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="btn btn-sm btn-outline-light rounded-circle"
          style={{ width: 32, height: 32 }}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      <hr className="bg-light" />

      <nav className="nav flex-column">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link text-white d-flex align-items-center py-3 px-3 ${
                isActive ? "active bg-primary" : ""
              }`}
              style={{
                transition: "all 0.3s",
                whiteSpace: "nowrap",
              }}
            >
              <Icon size={20} className="me-3" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default AdminSidebar;
