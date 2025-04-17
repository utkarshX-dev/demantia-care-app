// models/Reminder.js
const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    patientName: String,
    medicineName: String,
    time: String,
    isTaken: { type: Boolean, default: false }
});

module.exports = mongoose.model('Reminder', reminderSchema);
