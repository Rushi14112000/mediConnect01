import express from "express";
import { HospitalReg } from "../models/HospitalModel.js";
import { Vacancy } from "../models/HospitalModel.js"

const router = express.Router();

//route for Post data into the database
router.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.number || !req.body.email || !req.body.city || !req.body.address || !req.body.password) {
            return res.status(400).send({ message: "Please fill in all fields." });
        }
        const newHospitalReg = {
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            city: req.body.city,
            address: req.body.address,
            password: req.body.password,
        };
        const book = await HospitalReg.create(newHospitalReg);
        return res.status(201).send(book);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: err.message });
    }
});

// Posting the vacancies to the vacancies table
router.post('/vacancies', async (req, res) => {
    try {
        const { name, number, email, address, position, startTime, endTime, startDate, endDate, payment } = req.body;

        if (!name || !number || !email || !address || !position || !startTime || !endTime || !startDate || !endDate || !payment) {
            return res.status(400).send({ message: "Please fill in all fields." });
        }

        const newVacancy = new Vacancy({
            position,
            startDate,
            endDate,
            startTime,
            endTime,
            payment,
            name,
            email,
            address,
            number
        });

        const savedVacancy = await Vacancy.create(newVacancy);
        return res.status(201).send(savedVacancy);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: err.message });
    }
});


// //route for Get data from database
router.get('/HospRegForm', async (req, res) => {
    try {
        const hospitals = await HospitalReg.find();
        return res.status(200).json({ data: hospitals });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: err.message });
    }
});


// Fetch vacancies by hospital's email
router.get('/vacanciesFind', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }

        const vacancies = await Vacancy.find({ email: email });

        // Check if any vacancies were found
        if (vacancies.length === 0) {
            return res.status(404).send({ message: 'No vacancies found for this email' });
        }

        // Send the list of vacancies back to the client
        res.status(200).send(vacancies);
    } catch (err) {
        console.error('Error fetching vacancies:', err);
        res.status(500).send({ message: 'Error fetching vacancies' });
    }
});


router.delete('/vacancyDelete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Vacancy.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: 'Vacancy not found' });
        }

        res.status(200).send({ message: 'Vacancy deleted successfully' });
    } catch (err) {
        console.error('Error deleting vacancy:', err);
        res.status(500).send({ message: 'Error deleting vacancy' });
    }
});

export default router;