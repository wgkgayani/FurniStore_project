import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  Star,
} from "react-bootstrap-icons";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sampleProducts = [
    {
      _id: "1",
      name: "Modern Oak Dining Table",
      price: 29999,
      originalPrice: 59999,
      image: "/images/OIP-1.jpeg",
      reviews: "156",
    },
    {
      _id: "2",
      name: "Premium Leather Sofa - Black",
      price: 12999,
      originalPrice: 21999,
      image: "/images/OIP-2.jpeg",
      reviews: "89",
    },
    {
      _id: "3",
      name: "Wooden Coffee Table",
      price: 4499,
      originalPrice: 7999,
      image: "/images/OIP-3.jpeg",
      reviews: "234",
    },
    {
      _id: "4",
      name: "Ergonomic Office Chair",
      price: 28999,
      originalPrice: 32000,
      image: "/images/OIP-4.jpeg",
      reviews: "145",
    },
    {
      _id: "5",
      name: "Queen Size Bed Frame - Walnut",
      price: 59999,
      originalPrice: 10999,
      image: "/images/OIP-5.jpeg",
      reviews: "78",
    },
    {
      _id: "6",
      name: "Modern Wall Cabinet - Gray",
      price: 7999,
      originalPrice: 14999,
      image: "/images/OIP-6.jpeg",
      reviews: "92",
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      try {
        const response = await productAPI.getAll();
        const apiProducts = response.data.slice(0, 6);
        if (apiProducts.length > 0) {
          setFeaturedProducts(apiProducts);
        } else {
          setFeaturedProducts(sampleProducts);
        }
      } catch {
        setFeaturedProducts(sampleProducts);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section
        className="hero-section py-5 mb-5 "
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto">
              <h1
                className="display-4 fw-bold mb-4"
                style={{ color: "#ffffff" }}
              >
                Discover Premium Furniture for Your Dream Home
              </h1>
              <p className="lead mb-4" style={{ color: "#ffffff" }}>
                Transform your living space with our curated collection of
                high-quality furniture. Comfort, style, and durability in every
                piece.
              </p>
              <Link to="/products" className="btn btn-light btn-lg px-4 py-3">
                Shop Now <ArrowRight className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products mb-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Featured Products</h2>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section mb-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="text-center p-4 bg-white rounded shadow-sm">
                <Truck size={40} className="text-primary mb-3" />
                <h5>Free Shipping</h5>
                <p className="text-muted mb-0">On orders over $100</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-4 bg-white rounded shadow-sm">
                <ShieldCheck size={40} className="text-primary mb-3" />
                <h5>2-Year Warranty</h5>
                <p className="text-muted mb-0">Quality guaranteed</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-4 bg-white rounded shadow-sm">
                <CreditCard size={40} className="text-primary mb-3" />
                <h5>Secure Payment</h5>
                <p className="text-muted mb-0">100% secure transactions</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-4 bg-white rounded shadow-sm">
                <Star size={40} className="text-primary mb-3" />
                <h5>5-Star Support</h5>
                <p className="text-muted mb-0">24/7 customer service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement Section */}
      <section className="advertisement-section mb-5">
        <div className="container">
          {/* Main Offer Banner */}
          <div className="row mb-4">
            <div className="col-12">
              <div
                className="ad-banner py-5 px-5 rounded-lg shadow-lg position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
                  minHeight: "300px",
                }}
              >
                <div className="position-relative z-3">
                  <span className="badge bg-warning text-dark fs-6 mb-3">
                    Limited Time Offer
                  </span>
                  <h2 className="display-5 fw-bold mb-3">
                    Summer Furniture Sale
                  </h2>
                  <p className="lead mb-4">
                    Get up to <strong>50% OFF</strong> on selected furniture
                    collections. Transform your home with our premium furniture
                    at unbeatable prices!
                  </p>
                  <Link
                    to="/products"
                    className="btn btn-light btn-lg px-5 py-3 fw-bold"
                  >
                    Shop Sale Now <ArrowRight className="ms-2" />
                  </Link>
                </div>
                <div
                  className="position-absolute"
                  style={{
                    right: "-50px",
                    bottom: "-50px",
                    opacity: "0.5",
                    fontSize: "200px",
                  }}
                >
                  🛋️
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Offers */}
          <div className="row g-4 mb-4">
            {/* New Products */}
            <div className="col-lg-4">
              <div
                className="ad-card rounded-lg shadow-sm overflow-hidden h-100 position-relative"
                style={{
                  background:
                    "linear-gradient(13deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  minHeight: "250px",
                }}
              >
                <div className="p-4 d-flex flex-column justify-content-between h-100">
                  <div>
                    <span className="badge bg-info mb-3">New Arrivals</span>
                    <h4 className="fw-bold mb-2">Latest Collections</h4>
                    <p className="mb-0">
                      Discover our newest furniture designs with modern styles
                      and contemporary aesthetics.
                    </p>
                  </div>
                  <Link
                    to="/products?sort=newest"
                    className="btn btn-light btn-sm mt-3 align-self-start"
                  >
                    Explore Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Free Shipping Offer */}
            <div className="col-lg-4">
              <div
                className="ad-card rounded-lg shadow-sm overflow-hidden h-100 position-relative"
                style={{
                  background:
                    "linear-gradient(13deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
                  minHeight: "250px",
                }}
              >
                <div className="p-4 d-flex flex-column justify-content-between h-100">
                  <div>
                    <span className="badge bg-success mb-3">Special Offer</span>
                    <h4 className="fw-bold mb-2">Free Shipping Deal</h4>
                    <p className="mb-0">
                      Enjoy free shipping on all orders above $100. No hidden
                      charges, just great savings!
                    </p>
                  </div>
                  <Link
                    to="/products"
                    className="btn btn-light btn-sm mt-3 align-self-start"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Clearance Sale */}
            <div className="col-lg-4">
              <div
                className="ad-card rounded-lg shadow-sm overflow-hidden h-100 position-relative"
                style={{
                  background:
                    "linear-gradient(13deg, #fa709a 0%, #fee140 100%)",
                  color: "white",
                  minHeight: "250px",
                }}
              >
                <div className="p-4 d-flex flex-column justify-content-between h-100">
                  <div>
                    <span className="badge bg-danger mb-3">Clearance Sale</span>
                    <h4 className="fw-bold mb-2">Stock Clearance</h4>
                    <p className="mb-0">
                      Last chance to grab premium furniture at clearance prices.
                      Limited stock available!
                    </p>
                  </div>
                  <Link
                    to="/products"
                    className="btn btn-light btn-sm mt-3 align-self-start"
                  >
                    Grab Deal
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Ad Banner */}
          <div className="row">
            <div className="col-md-6">
              <div className="featured-ad rounded-lg overflow-hidden shadow-sm position-relative h-100">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
                  alt="Modern Sofa Collection"
                  className="img-fluid h-100 w-100"
                  style={{ objectFit: "cover", opacity: "0.6" }}
                />
                <div
                  className="position-absolute top-0 start-0 p-4 w-100 h-100 d-flex flex-column justify-content-center"
                  style={{ zIndex: 2 }}
                >
                  <h3 className="fw-bold text-black mb-2">Sofa Collection</h3>
                  <p className="text-black mb-3">
                    Premium comfort & style combined
                  </p>
                  <Link
                    to="/products?category=sofa"
                    className="btn btn-light btn-sm w-fit"
                  >
                    Browse Sofas
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="featured-ad rounded-lg overflow-hidden shadow-sm position-relative h-100">
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
                  alt="Office Desk Collection"
                  className="img-fluid h-100 w-100"
                  style={{ objectFit: "cover", opacity: "0.6" }}
                />
                <div
                  className="position-absolute top-0 start-0 p-4 w-100 h-100 d-flex flex-column justify-content-center"
                  style={{ zIndex: 2 }}
                >
                  <h3 className="fw-bold text-black mb-2">Office Desks</h3>
                  <p className="text-black mb-3">
                    Work smarter with ergonomic designs
                  </p>
                  <Link
                    to="/products?category=desk"
                    className="btn btn-light btn-sm w-fit"
                  >
                    Browse Desks
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section mb-5">
        <div className="container">
          <h2 className="fw-bold mb-4">Shop by Category</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <Link
                to="/products?category=sofa"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Sofas"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Sofas</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to="/products?category=bed"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Beds"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Beds</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to="/products?category=table"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGSFet0SzJdS5Gjn2peHltj2cU5kr0_C-maw&s"
                    alt="Tables"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Tables</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link
                to="/products?category=chair"
                className="text-decoration-none"
              >
                <div className="card category-card">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Chairs"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Chairs</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <h2> </h2>
        </div>
      </section>

      {/* Just For You Section */}
      <section className="just-for-you-section mb-5">
        <div className="container">
          <h2 className="fw-bold mb-4">Just For You</h2>
          <div className="row g-4">
            {featuredProducts && featuredProducts.length > 0
              ? featuredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="col-lg-2 col-md-3 col-sm-4 col-6"
                  >
                    <Link
                      to={`/product/${product._id}`}
                      className="text-decoration-none"
                    >
                      <div className="card product-card h-100 shadow-sm">
                        <div
                          style={{
                            height: "180px",
                            overflow: "hidden",
                            backgroundColor: "#f5f5f5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="card-img-top w-100 h-100"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                              display: "block",
                            }}
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/180x180?text=Furniture";
                            }}
                          />
                        </div>
                        <div className="card-body p-3">
                          <h6
                            className="card-title fw-600 text-dark mb-2"
                            style={{ fontSize: "0.9rem", lineHeight: "1.3" }}
                          >
                            {product.name}
                          </h6>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="fw-bold text-danger">
                              Rs.{product.price}
                            </span>
                            {product.originalPrice && (
                              <>
                                <span
                                  className="text-muted text-decoration-line-through"
                                  style={{ fontSize: "0.85rem" }}
                                >
                                  Rs.{product.originalPrice}
                                </span>
                                <span
                                  className="badge bg-danger"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  {Math.round(
                                    ((product.originalPrice - product.price) /
                                      product.originalPrice) *
                                      100,
                                  )}
                                  %
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              : loading
                ? // Skeleton Loading Cards
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="col-lg-2 col-md-3 col-sm-4 col-6"
                    >
                      <div className="card product-card h-100 shadow-sm">
                        <div
                          style={{
                            height: "180px",
                            overflow: "hidden",
                            backgroundColor: "#e9ecef",
                            animation: "shimmer 2s infinite",
                          }}
                        />
                        <div className="card-body p-3">
                          <div
                            className="mb-2"
                            style={{
                              height: "18px",
                              backgroundColor: "#e9ecef",
                              borderRadius: "4px",
                              animation: "shimmer 2s infinite",
                            }}
                          />
                          <div
                            className="mb-2"
                            style={{
                              height: "18px",
                              backgroundColor: "#e9ecef",
                              borderRadius: "4px",
                              width: "70%",
                              animation: "shimmer 2s infinite",
                            }}
                          />
                          <div
                            className="mb-2"
                            style={{
                              height: "16px",
                              backgroundColor: "#e9ecef",
                              borderRadius: "4px",
                              width: "50%",
                              animation: "shimmer 2s infinite",
                            }}
                          />
                          <div
                            style={{
                              height: "14px",
                              backgroundColor: "#e9ecef",
                              borderRadius: "4px",
                              width: "60%",
                              animation: "shimmer 2s infinite",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : // Show sample products if no API products
                  sampleProducts.map((product) => (
                    <div
                      key={product._id}
                      className="col-lg-2 col-md-3 col-sm-4 col-6"
                    >
                      <Link
                        to={`/product/${product._id}`}
                        className="text-decoration-none"
                      >
                        <div className="card product-card h-100 shadow-sm">
                          <div
                            style={{
                              height: "180px",
                              overflow: "hidden",
                              backgroundColor: "#f5f5f5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="card-img-top w-100 h-100"
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                display: "block",
                              }}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/180x180?text=Furniture";
                              }}
                            />
                          </div>
                          <div className="card-body p-3">
                            <h6
                              className="card-title fw-600 text-dark mb-2"
                              style={{ fontSize: "0.9rem", lineHeight: "1.3" }}
                            >
                              {product.name}
                            </h6>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <span className="fw-bold text-danger">
                                Rs.{product.price}
                              </span>
                              {product.originalPrice && (
                                <>
                                  <span
                                    className="text-muted text-decoration-line-through"
                                    style={{ fontSize: "0.85rem" }}
                                  >
                                    Rs.{product.originalPrice}
                                  </span>
                                  <span
                                    className="badge bg-danger"
                                    style={{ fontSize: "0.7rem" }}
                                  >
                                    {Math.round(
                                      ((product.originalPrice - product.price) /
                                        product.originalPrice) *
                                        100,
                                    )}
                                    %
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <Link to="/products" className="btn btn-outline-primary">
                View More <ArrowRight className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
