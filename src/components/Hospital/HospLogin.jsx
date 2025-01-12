import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HospLogin = () => {
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    const { email, password } = data;

    // Frontend Validation
    if (!email) formErrors.email = "Email is required";
    if (!password) formErrors.password = "Password is required";

    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5555/HospRegForm", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch hospitals data");
      }

      const result = await response.json();

      const hospital = result.data.find(
        (hospital) => hospital.email === email && hospital.password === password
      );

      if (hospital) {
        const token = result.token;

        localStorage.setItem("userToken", token);

        const hospDetails = {
          name: hospital.name,
          email: hospital.email,
          id: hospital._id,
          address: hospital.address,
          number: hospital.number,
        };
        localStorage.setItem("hospDetails", JSON.stringify(hospDetails));

        alert("Login successful!");
        navigate("/HospDashboard");

        // Reset form after successful login
        setData({
          email: "",
          password: "",
        });
        setError({});
      } else {
        setError({ email: "", password: "Invalid email or password" });
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Hospital Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              required
            />
            {error.email && <small className="text-danger">{error.email}</small>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
              required
            />
            {error.password && <small className="text-danger">{error.password}</small>}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="mt-3 text-center">
          <small>
            Don't have an account? <Link to="/HospRegForm">Sign up</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default HospLogin;
