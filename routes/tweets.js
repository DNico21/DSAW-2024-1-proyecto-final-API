// tweets.js
const express = require('express');
const ModelTweet = require('../tweetModel');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

// Ruta para crear un nuevo tweet
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newTweet = new ModelTweet({
      content: req.body.content,
      user: req.user.userId,
    });
    const savedTweet = await newTweet.save();
    res.status(201).send(savedTweet);
  } catch (error) {
    res.status(500).send({ error: 'Error creating tweet' });
  }
});

// Ruta para obtener tweets aleatorios
router.get('/random', async (req, res) => {
  try {
    const tweets = await ModelTweet.aggregate([{ $sample: { size: 10 } }]); // Obtener 10 tweets aleatorios
    res.send(tweets);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching tweets' });
  }
});

module.exports = router;