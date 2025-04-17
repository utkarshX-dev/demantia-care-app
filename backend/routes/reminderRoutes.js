const express = require('express');
const router = express.Router();
const GameScore = require('../models/GameScore');

// Route to save score
router.post('/save-score', (req, res) => {
    const { userId, gameName, score } = req.body;

    const newScore = new GameScore({
        userId,
        gameName,
        score
    });

    newScore.save()
        .then(savedScore => {
            res.json(savedScore);
        })
        .catch(err => {
            console.error('Error saving score:', err);
            res.status(500).send('Error saving score');
        });
});

// Route to get leaderboard (top scores)
router.get('/leaderboard', (req, res) => {
    GameScore.find()
        .sort({ score: -1 })  // Sort by score in descending order
        .limit(10)  // Limit to top 10 scores
        .then(scores => {
            res.json(scores);
        })
        .catch(err => {
            console.error('Error fetching leaderboard:', err);
            res.status(500).send('Error fetching leaderboard');
        });
});

module.exports = router;
