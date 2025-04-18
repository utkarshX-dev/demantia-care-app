const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true  // Ensure that patient name is always provided
    },
    medicineName: {
        type: String,
        required: true  // Ensure that medicine name is always provided
    },
    time: {
        type: Date,
        required: true,  // Ensure that time is always provided
    },
    isTaken: {
        type: Boolean,
        default: false  // Default to false if not provided
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Reminder', reminderSchema);
