//home.js "/"
const express = require('express');
const ModelTweet = require('../tweetModel');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

router.get('/',authMiddleware, async (req, res) => {
  try {
    const tweets = await ModelTweet.aggregate([{ $sample: { size: 10 } }]); // Obtener 10 tweets aleatorios
    res.send(tweets);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching tweets' });
  }
});

module.exports = router;