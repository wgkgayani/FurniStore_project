import React, { useState, useEffect } from "react";
import { userAPI } from "../../services/api";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Person,
  Envelope,
  Calendar,
  Shield,
  ShieldLock,
  ShieldShaded,
  Pencil,
  Trash,
  Ban,
  CheckCircle,
  Eye,
} from "react-bootstrap-icons";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let result = [...users];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (u) =>
          u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      result = result.filter((u) => u.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((u) =>
        statusFilter === "blocked" ? u.isBlocked : !u.isBlocked,
      );
    }

    setFilteredUsers(result);
  };

  const toggleUserBlock = async (userId) => {
    try {
      await userAPI.toggleBlock(userId);
      toast.success("User status updated");
      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user status",
      );
    }
  };

  const changeUserRole = async (userId, newRole) => {
    try {
      await userAPI.updateRole(userId, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user role",
      );
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userAPI.deleteUser(userId);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <ShieldShaded className="text-danger" />;
      case "moderator":
        return <ShieldLock className="text-warning" />;
      default:
        return <Shield className="text-info" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container-fluid p-4">
      <h4 className="mb-4">User Management</h4>

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
                  placeholder="Search by name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="customer">Customers</option>
                <option value="moderator">Moderators</option>
                <option value="admin">Admins</option>
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            <div className="col-md-2">
              <span className="badge bg-primary p-3 w-100">
                {filteredUsers.length} Users
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
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
                    <th>User</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredUsers.map((user) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layout
                      >
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={
                                user.img ||
                                "https://avatar.iran.liara.run/public/boy?username=User"
                              }
                              alt={user.firstName}
                              className="rounded-circle me-2"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <strong>
                                {user.firstName} {user.lastName}
                              </strong>
                              <br />
                              <small className="text-muted">
                                @{user.username || user.email.split("@")[0]}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <Envelope size={14} className="me-1" />
                            {user.email}
                            {user.phone && (
                              <>
                                <br />
                                <small>{user.phone}</small>
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-sm dropdown-toggle d-flex align-items-center gap-2"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              {getRoleIcon(user.role)}
                              <span className="text-capitalize">
                                {user.role}
                              </span>
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    changeUserRole(user._id, "customer")
                                  }
                                >
                                  <Shield className="me-2" />
                                  Make Customer
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    changeUserRole(user._id, "moderator")
                                  }
                                >
                                  <ShieldLock className="me-2" />
                                  Make Moderator
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() =>
                                    changeUserRole(user._id, "admin")
                                  }
                                >
                                  <ShieldShaded className="me-2" />
                                  Make Admin
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${user.isBlocked ? "btn-danger" : "btn-success"}`}
                            onClick={() => toggleUserBlock(user._id)}
                          >
                            {user.isBlocked ? (
                              <>
                                <Ban className="me-1" />
                                Blocked
                              </>
                            ) : (
                              <>
                                <CheckCircle className="me-1" />
                                Active
                              </>
                            )}
                          </button>
                        </td>
                        <td>
                          <Calendar className="me-1" />
                          {formatDate(user.createdAt || user.date)}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary">
                              <Eye size={16} />
                            </button>
                            <button className="btn btn-sm btn-outline-warning">
                              <Pencil size={16} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteUser(user._id)}
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

              {filteredUsers.length === 0 && (
                <div className="text-center py-5">
                  <h6>No users found</h6>
                  <p className="text-muted">Try adjusting your filters</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
