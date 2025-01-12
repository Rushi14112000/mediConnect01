import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HospDashboard = () => {
    const navigate = useNavigate();
    const [hospDetails, setHospDetails] = useState(null);
    const [openVacancies, setOpenVacancies] = useState([]);
    const [acceptedVacancies, setAcceptedVacancies] = useState([]);

    useEffect(() => {
        const fetchVacancies = async () => {
            const token = localStorage.getItem("userToken");
            if (!token) {
                navigate("/HospLogin");
                return;
            }

            const storedHospDetails = localStorage.getItem("hospDetails");
            if (storedHospDetails) {
                const parsedDetails = JSON.parse(storedHospDetails);
                setHospDetails(parsedDetails);

                try {
                    const response = await fetch(`http://localhost:5555/vacanciesFind?email=${parsedDetails.email}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch vacancies");
                    }
                    const data = await response.json();

                    // Separate vacancies into open and accepted
                    const openVacancies = data.filter(vacancy => !vacancy.accepted);
                    const acceptedVacancies = data.filter(vacancy => vacancy.accepted);

                    setOpenVacancies(openVacancies);
                    setAcceptedVacancies(acceptedVacancies);
                } catch (error) {
                    console.error("Error fetching vacancies:", error);
                }
            }
        };

        fetchVacancies();
    }, [navigate]);

    useEffect(() => {
        if (openVacancies.length > 0) {
            const $ = window.$;
            $('#openVacanciesTable').DataTable({
                destroy: true,
                paging: true,
                ordering: false,
            });
        }
    }, [openVacancies]);

    useEffect(() => {
        if (acceptedVacancies.length > 0) {
            const $ = window.$;
            $('#acceptedVacanciesTable').DataTable({
                destroy: true,
                paging: true,
                ordering: false,
            });
        }
    }, [acceptedVacancies]);

    const handleDelete = async (vacancyId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this vacancy?");
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5555/vacancyDelete/${vacancyId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setOpenVacancies(openVacancies.filter(vacancy => vacancy._id !== vacancyId));
                window.alert("Vacancy deleted successfully.");
            } else {
                console.error("Failed to delete the vacancy");
                window.alert("Failed to delete the vacancy. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting vacancy:", error);
            window.alert("An error occurred while deleting the vacancy.");
        }
    };

    return (
        <div>
            <h1>Welcome to the Hospital Dashboard!</h1>

            {/* Current Open Vacancies Section */}
            <div className="d-flex justify-content-center align-items-center">
                <div className="card p-4" style={{ width: '100%', maxWidth: '1000px' }}>
                    <h2 className="text-center">Current Open Vacancies</h2>
                    <table id="openVacanciesTable" className="display">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Start Date & Time</th>
                                <th>End Date & Time</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openVacancies.length > 0 ? (
                                openVacancies.map((vacancy) => (
                                    <tr key={vacancy._id}>
                                        <td>{vacancy.position}</td>
                                        <td>{vacancy.startDate} - {vacancy.startTime}</td>
                                        <td>{vacancy.endDate} - {vacancy.endTime}</td>
                                        <td>₹ {vacancy.payment}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(vacancy._id)}
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No open vacancies available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Accepted Vacancies Section */}
            <div className="d-flex justify-content-center align-items-center my-4">
                <div className="card p-4" style={{ width: '100%', maxWidth: '1000px' }}>
                    <h2 className="text-center">Accepted Vacancies</h2>
                    <table id="acceptedVacanciesTable" className="display">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Start Date & Time</th>
                                <th>End Date & Time</th>
                                <th>Payment</th>
                                <th>Accepted By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {acceptedVacancies.length > 0 ? (
                                acceptedVacancies.map((vacancy) => (
                                    <tr key={vacancy._id}>
                                        <td>{vacancy.position}</td>
                                        <td>{vacancy.startDate} - {vacancy.startTime}</td>
                                        <td>{vacancy.endDate} - {vacancy.endTime}</td>
                                        <td>₹ {vacancy.payment}</td>
                                        <td>{vacancy.acceptedBy}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No accepted vacancies available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HospDashboard;
