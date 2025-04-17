const mongoose = require('mongoose');

const gameScoreSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    gameName: { type: String, required: true },
    score: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('GameScore', gameScoreSchema);
