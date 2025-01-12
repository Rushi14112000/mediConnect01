import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DocRegForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    name: "",
    number: "",
    email: "",
    city: "",
    password: "",
    repassword: "",
  });

  const [data, setData] = useState({
    name: "",
    number: "",
    email: "",
    city: "",
    password: "",
    repassword: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    const { name, number, email, city, password, repassword } = data;

    if (!name) formErrors.name = "Name is required";
    if (!number) formErrors.number = "Number is required";
    if (!email) formErrors.email = "Email is required";
    if (!city) formErrors.city = "city is required";
    if (!password) formErrors.password = "Password is required";
    if (!repassword) formErrors.repassword = "Repassword is required";
    if (password !== repassword) formErrors.repassword = "Password and repassword must be the same";

    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    // Send Data to Backend
    try {
      const response = await fetch("http://localhost:5555/DocReg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          number,
          email,
          city,
          password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Doctor Registered:", result);
        alert("Doctor registered successfully!");

        // Reset Form Data
        setData({
          name: "",
          number: "",
          email: "",
          city: "",
          password: "",
          repassword: "",
        });
        setError({});

        //redirect to Login page
        navigate("/DocLogin");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        alert("Error: " + errorData.message);
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
      alert(`Error: ${err.message || "An unknown error occurred."}`);
    }


  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Doctor Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              value={data.name}
              onChange={handleChange}
              required
            />
            {error.name && <small className="text-danger">{error.name}</small>}
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="number"
              name="number"
              placeholder="Enter Contact Number"
              value={data.number}
              onChange={handleChange}
              required
            />
            {error.number && <small className="text-danger">{error.number}</small>}
          </div>
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
            <select
              className="form-control"
              id="city"
              name="city"
              value={data.city}
              onChange={handleChange}
              required
            >
              <option value="">Select your city</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Chandigarh">Chandigarh</option>
            </select>
            {error.city && <small className="text-danger">{error.city}</small>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Create a password"
              value={data.password}
              onChange={handleChange}
              required
            />
            {error.password && <small className="text-danger">{error.password}</small>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="repassword"
              name="repassword"
              placeholder="Re-Enter the password"
              value={data.repassword}
              onChange={handleChange}
              required
            />
            {error.repassword && <small className="text-danger">{error.repassword}</small>}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <div className="mt-3 text-center">
          <small>
            Already have an account? <Link to="/DocLogin">Login</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default DocRegForm;
