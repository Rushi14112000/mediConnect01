import mongoose from "mongoose";

const HospRegSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        number: { type: Number, required: true },
        email: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        password: { type: String, required: true }, // Ensure this is String
    },
    { timestamps: true }
);

const vacancySchema = new mongoose.Schema({
    position: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    payment: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    number: { type: String, required: true },
    acceptedBy: { type: String, default: null },
    accepted: { type: Boolean, default: false },
}, { timestamps: true });

export const Vacancy = mongoose.model('Vacancy', vacancySchema);


export const HospitalReg = mongoose.model("HospitalReg", HospRegSchema);
