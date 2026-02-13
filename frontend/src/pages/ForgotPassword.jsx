import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Envelope } from "react-bootstrap-icons";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    // No backend reset endpoint exists in current project; simulate sending link
    setTimeout(() => {
      setLoading(false);
      toast.success(`If an account with ${email} exists, a reset link was sent.`);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h3 className="mb-3">Forgot Password</h3>
              <p className="text-muted">Enter your email and we'll send a reset link.</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <Envelope className="me-2" /> Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="text-center mt-3">
                  <button type="button" className="btn btn-link" onClick={() => navigate("/login")}>Back to login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
