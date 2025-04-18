const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,  // Automatically trims spaces around the name
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,  // Automatically trims spaces around the email
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password); // Compare the provided password with the stored hashed password
};

module.exports = mongoose.model('User', userSchema);
