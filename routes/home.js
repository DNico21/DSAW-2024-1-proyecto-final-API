const express = require('express');
const ModelTweet = require('../tweetModel');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const tweets = await ModelTweet.find(); // Obtener todos los tweets
    res.send(tweets);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching tweets' });
  }
});

module.exports = router;