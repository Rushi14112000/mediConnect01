import React, { useState } from "react";

const Vacancies = () => {
    const [formData, setFormData] = useState({
        position: "",
        startDate: "",
        endDate:"",
        startTime: "",
        endTime: "",
        payment: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hospDetails = JSON.parse(localStorage.getItem("hospDetails"));

        if (!hospDetails) {
            alert("Hospital details not found. Please log in again.");
            return;
        }

        const vacancyData = {
            ...formData,
            name: hospDetails.name,
            email: hospDetails.email,
            address: hospDetails.address,
            number: hospDetails.number,
        };

        try {
            const response = await fetch("http://localhost:5555/vacancies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vacancyData),
            });

            if (!response.ok) {
                throw new Error("Failed to post the vacancy");
            }

            alert("Vacancy posted successfully!");
            setFormData({
                position: "",
                date: "",
                startTime: "",
                endDate:"",
                endTime: "",
                payment: "",
            });
        } catch (err) {
            console.error("Error posting vacancy:", err);
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <h2 className="text-center">Post a New Vacancy</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="position" className="form-label">Position</label>
                        <select
                            className="form-control"
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select the required position</option>
                            <option value="General Practitioner">General Practitioner</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Psychiatrist">Psychiatrist</option>
                            <option value="Radiologist">Radiologist</option>
                            <option value="Ophthalmologist">Ophthalmologist</option>
                            <option value="Dentist">Dentist</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            name="startDate"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="endDate"
                            name="endDate"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startTime" className="form-label">Start Time</label>
                        <input
                            type="time"
                            className="form-control"
                            id="startTime"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endTime" className="form-label">End Time</label>
                        <input
                            type="time"
                            className="form-control"
                            id="endTime"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            className="form-control"
                            id="payment"
                            name="payment"
                            value={formData.payment}
                            onChange={handleChange}
                            placeholder="Enter the payment amount"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Post Vacancy</button>
                </form>
            </div>
        </div>
    );
};

export default Vacancies;
