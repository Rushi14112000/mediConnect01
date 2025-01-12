import React, { useState, useEffect } from 'react';

export default function DisplayVacancies() {
    const [vacancies, setVacancies] = useState([]);
        const [doctorDetails, setDoctorDetails] = useState(null);
    

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await fetch('http://localhost:5555/vacancies');
                if (!response.ok) {
                    throw new Error('Failed to fetch vacancies');
                }
                const data = await response.json();

                // Sort the vacancies array by updatedAt in descending order
                const sortedData = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                setVacancies(sortedData);
            } catch (error) {
                console.error('Error fetching vacancies:', error);
                alert('Error fetching vacancies');
            }
        };

        fetchVacancies();
    }, []);

    useEffect(() => {
        // Initialize DataTable only if vacancies are fetched and sorted
        if (vacancies.length > 0) {
            const $ = window.$;
            $('#vacancyTable').DataTable({
                destroy: true,  // Destroy any existing table instance
                paging: true,  // Enable pagination
                ordering: false,  // Disable internal DataTables ordering
            });
        }
    }, [vacancies]);

    const handleAccept = async (vacancyId) => {
        // Retrieve doctor details from localStorage
        const storedDoctorDetails = localStorage.getItem("doctorDetails");
        if (storedDoctorDetails) {
            const doctorDetails = JSON.parse(storedDoctorDetails);
            setDoctorDetails(doctorDetails);
    
            try {
                const response = await fetch(`http://localhost:5555/vacancies/${vacancyId}/accept`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: doctorDetails.email }), // Send the email in the request body
                });
    
                if (!response.ok) {
                    throw new Error('Failed to accept vacancy');
                }
    
                alert(`Vacancy ${vacancyId} accepted!`);
                setVacancies((prevVacancies) =>
                    prevVacancies.map((vacancy) =>
                        vacancy._id === vacancyId ? { ...vacancy, accepted: true } : vacancy
                    )
                );
            } catch (error) {
                console.error('Error accepting vacancy:', error);
                alert('Error accepting vacancy');
            }
        } else {
            alert('Error: Doctor details not found.');
        }
    };
    

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card p-2" style={{ width: '90%', maxWidth: '95vw' }}>
                <h2 className="text-center">Available Vacancies</h2>
                <table id="vacancyTable" className="display">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Start Date & Time</th>
                            <th>End Date & Time</th>
                            <th>Payment</th>
                            <th>Hospital Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacancies.length > 0 ? (
                            vacancies.map((vacancy) => (
                                <tr key={vacancy._id}>
                                    <td>{vacancy.position}</td>
                                    <td>{vacancy.startDate}- {vacancy.startTime}</td>
                                    <td>{vacancy.endDate} - {vacancy.endTime}</td>
                                    <td>₹ {vacancy.payment}</td>
                                    <td>{vacancy.name}</td>
                                    <td>{vacancy.address}</td>
                                    <td>{vacancy.number}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleAccept(vacancy._id)}
                                            disabled={vacancy.accepted}
                                        >
                                            {vacancy.accepted ? 'Accepted' : 'Accept'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No vacancies available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
