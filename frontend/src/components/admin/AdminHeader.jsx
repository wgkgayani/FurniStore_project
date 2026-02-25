import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { Bell, PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { motion } from "framer-motion";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm py-3 px-4">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Welcome back, {user?.firstName || "Admin"}!</h5>

        <div className="d-flex align-items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-light position-relative rounded-circle"
            style={{ width: 40, height: 40 }}
          >
            <Bell size={18} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </motion.button>

          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
            >
              <PersonCircle size={20} />
              <span>{user?.firstName}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/profile")}
                >
                  <PersonCircle className="me-2" />
                  Profile
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <BoxArrowRight className="me-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
