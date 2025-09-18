import React, { useState } from "react";
import "../Styles/ForgotPassword.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch("https://recipes-1-94o3.onrender.com/auth/forgotpassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        toast.success("Password updated successfully!");

        setTimeout(() => {
          window.location.href = "/login";
        }, 4000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error updating password.");
        toast.error("Failed to update password.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error updating password.");
      toast.error("Failed to update password.");
    }
  };

  return (
    <div className="main-content">
      <div className="SignupContainer">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {message && <p className="fill-fields-error">{message}</p>}
        
        <div className="auth-links">
          <p>Remember your password? <Link to="/login">Back to Login</Link></p>
        </div>
        
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdatePassword;
