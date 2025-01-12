import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import hospRoute from './routes/HospitalRoute.js';
import docRoute from './routes/DocRoute.js';

const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGODB_URI || 'mongodb+srv://rushirpatil491:Appleiphone%4012@cluster0.ytarg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

// Enable CORS for specific origins or all
app.use(cors({
    origin: 'http://yourfrontend.com', // specify your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Middleware for parsing JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

// Mount routes
app.use('/hospitals', hospRoute);
app.use('/doctors', docRoute);

// Connect to MongoDB
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
