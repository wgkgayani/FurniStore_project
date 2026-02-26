import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash, Grid, Image, Save } from "react-bootstrap-icons";
import { toast } from "react-toastify";

const AdminCategories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Sofas",
      slug: "sofas",
      count: 45,
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25",
    },
    {
      id: 2,
      name: "Beds",
      slug: "beds",
      count: 32,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    {
      id: 3,
      name: "Tables",
      slug: "tables",
      count: 28,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGSFet0SzJdS5Gjn2peHltj2cU5kr0_C-maw&s",
    },
    {
      id: 4,
      name: "Chairs",
      slug: "chairs",
      count: 56,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    },
    {
      id: 5,
      name: "Wardrobes",
      slug: "wardrobes",
      count: 18,
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    },
    {
      id: 6,
      name: "Desks",
      slug: "desks",
      count: 24,
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Auto-generate slug from name
      ...(name === "name" && {
        slug: value.toLowerCase().replace(/\s+/g, "-"),
      }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.slug) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editingCategory) {
      // Update existing category
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...formData, id: c.id, count: c.count }
            : c,
        ),
      );
      toast.success("Category updated successfully");
    } else {
      // Add new category
      const newCategory = {
        ...formData,
        id: categories.length + 1,
        count: 0,
      };
      setCategories([...categories, newCategory]);
      toast.success("Category added successfully");
    }

    setShowForm(false);
    setEditingCategory(null);
    setFormData({ name: "", slug: "", image: "" });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      image: category.image,
    });
    setShowForm(true);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== categoryId));
      toast.success("Category deleted successfully");
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Category Management</h4>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary d-flex align-items-center"
          onClick={() => {
            setEditingCategory(null);
            setFormData({ name: "", slug: "", image: "" });
            setShowForm(true);
          }}
        >
          <Plus className="me-2" />
          Add New Category
        </motion.button>
      </div>

      <div className="row">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <div className="card border-0 shadow-sm h-100">
              <img
                src={category.image}
                alt={category.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{category.name}</h5>
                  <span className="badge bg-primary">
                    {category.count} products
                  </span>
                </div>
                <p className="text-muted small mb-3">Slug: {category.slug}</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary flex-grow-1"
                    onClick={() => handleEdit(category)}
                  >
                    <Pencil className="me-1" />
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger flex-grow-1"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash className="me-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Category Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowForm(false)}
                  ></button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Modern Sofas"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        placeholder="e.g., modern-sofas"
                        required
                      />
                      <small className="text-muted">
                        Used in URLs: /products?category=modern-sofas
                      </small>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Category Image URL</label>
                      <input
                        type="url"
                        className="form-control"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>

                    {formData.image && (
                      <div className="text-center">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="img-fluid rounded"
                          style={{ maxHeight: "150px" }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <Save className="me-2" />
                      {editingCategory ? "Update Category" : "Save Category"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCategories;
