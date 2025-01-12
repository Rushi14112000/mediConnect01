import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DocLogin = () => {
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
      const response = await fetch("http://localhost:5555/DocReg", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch hospitals data");
      }

      const result = await response.json();

      // Check if email and password match any hospital in the database
      const doctor = result.data.find(
        (doctor) => doctor.email === email && doctor.password === password
      );

      if (doctor) {
        // Assuming the server returns a JWT on successful login
        const token = result.token; // This assumes your backend sends a token upon successful login

        // Store JWT in localStorage or sessionStorage
        localStorage.setItem("userToken", token);


        const doctorDetails = {
          name: doctor.name,
          email: doctor.email,
          id: doctor.id, // Assuming there's an ID for the doctor in your database
          // Add any other details you want to store
        };
        localStorage.setItem("doctorDetails", JSON.stringify(doctorDetails));

        alert("Login successful!");
        navigate("/DocDashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert(`Error: ${err.message}`);
    }

    // Reset form
    setData({
      email: "",
      password: "",
    });
    setError({});
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Doctor Login</h2>
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
            />
            <span className="text-danger">{error.email}</span> {/* Error message in span */}
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
            />
            <span className="text-danger">{error.password}</span> {/* Error message in span */}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="mt-3 text-center">
          <small>
            Don't have an account? <Link to="/DocRegForm">Sign up</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default DocLogin;
