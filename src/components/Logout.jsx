import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT from localStorage
    localStorage.removeItem("userToken");

  localStorage.removeItem("doctorDetails");
  sessionStorage.clear(); // Clear session-specific data

    // Redirect to the login page
    navigate("/");
  };

  const buttonStyles = {
    marginTop : "10vh",
    marginRight : "1%",
  };

  return (
    <button
    className="btn btn-danger position-absolute end-0 top-0"
    onClick={handleLogout}
    style={buttonStyles}>
    Logout
  </button>
  );
};

export default Logout;
