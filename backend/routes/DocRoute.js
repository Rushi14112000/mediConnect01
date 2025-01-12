import express from "express";
import { DoctorReg } from "../models/DocModel.js";
import { Vacancy } from "../models/HospitalModel.js"

const router = express.Router();

//route for Post data into the database
router.post('/DocReg', async (req, res) => {
    try {
        if (!req.body.name || !req.body.number || !req.body.email || !req.body.city || !req.body.password) {
            return res.status(400).send({ message: "Please fill in all fields." });
        }
        const newDoctorReg = {
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            city: req.body.city,
            password: req.body.password,
        };
        const book = await DoctorReg.create(newDoctorReg);
        return res.status(201).send(book);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: err.message });
    }
});

// //route for Get data from database
router.get('/DocReg', async (req, res) => {
    try {
      const doctors = await DoctorReg.find();
      return res.status(200).json({ data: doctors });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send({ message: err.message });
    }
  });
  
  //get data from the vacancies table to show to the doctors
  router.get('/vacancies', async (req, res) => {
    try {
        const vacancies = await Vacancy.find();
        res.json(vacancies); // Send vacancies as JSON response
    } catch (error) {
        console.error('Error fetching vacancies:', error);
        res.status(500).json({ message: 'Error fetching vacancies' });
    }
});

// Route to accept a vacancy
router.patch('/vacancies/:vacancyId/accept', async (req, res) => {
    const { vacancyId } = req.params;
    const { email } = req.body;  // Extract the doctor's email from the request body

    try {
        // Find the vacancy by ID and update its 'accepted' status and 'acceptedBy' field
        const vacancy = await Vacancy.findByIdAndUpdate(
            vacancyId,
            {
                accepted: true,
                acceptedBy: email,
                updatedAt: new Date()  // Update the timestamp
            },
            { new: true }
        );

        if (!vacancy) {
            return res.status(404).json({ message: 'Vacancy not found' });
        }

        res.json({ message: 'Vacancy accepted', vacancy });
    } catch (error) {
        console.error('Error accepting vacancy:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
  export default router