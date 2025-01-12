import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DocDashboard = () => {
    const navigate = useNavigate();
    const [doctorDetails, setDoctorDetails] = useState(null);
    const [showAlert, setShowAlert] = useState(false); // Initially false

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/DocLogin");
        }

        // Retrieve doctor details from localStorage
        const storedDoctorDetails = localStorage.getItem("doctorDetails");
        if (storedDoctorDetails) {
            setDoctorDetails(JSON.parse(storedDoctorDetails));
        }

        // Check if the alert has been dismissed in the current session
        const alertDismissed = sessionStorage.getItem("alertDismissed");
        if (!alertDismissed) {
            setShowAlert(true); // Show the alert if not dismissed
        }
    }, [navigate]);

    const dismissAlert = () => {
        setShowAlert(false);
        sessionStorage.setItem("alertDismissed", "true");
    };

    return (
        <div className="container mt-4">
            {showAlert && doctorDetails && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    Welcome, <strong>Dr.{doctorDetails.name}</strong>! You have successfully logged in.
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={dismissAlert} // Dismiss alert on button click
                    ></button>
                </div>
            )}
            <h1>Welcome to the Dashboard</h1>
            <p>Here is the content of the dashboard.</p>
        </div>
    );
};

export default DocDashboard;
