import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import hospRoute from './routes/HospitalRoute.js'
import docRoute from "./routes/DocRoute.js"

const PORT = process.env.PORT || 5555;
const mongoDBURL = 'mongodb://127.0.0.1:27017/mediConnect';

const app = express();

// Enable CORS for all routes and origins
app.use(cors());

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app.use('/', hospRoute);
app.use('/', docRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
