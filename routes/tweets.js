// tweets.js
const express = require("express");
const ModelTweet = require("../tweetModel");
const authMiddleware = require("../authMiddleware");
const router = express.Router();

// Ruta para crear un nuevo tweet
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newTweet = new ModelTweet({
      content: req.body.content,
      user: req.user.userId,
    });
    const savedTweet = await newTweet.save();
    res.status(201).send(savedTweet);
  } catch (error) {
    res.status(500).send({ error: "Error creating tweet" });
  }
});

// Ruta para obtener tweets aleatorios
router.get("/random", authMiddleware, async (req, res) => {
  try {
    const tweets = await ModelTweet.aggregate([{ $sample: { size: 10 } }]); // Obtener 10 tweets aleatorios
    res.send(tweets);
  } catch (error) {
    res.status(500).send({ error: "Error fetching tweets" });
  }
});

// Ruta para editar un tweet
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.user.userId;
    const { content } = req.body;

    // Buscar el tweet
    const tweet = await ModelTweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).send({ error: "Tweet not found" });
    }

    // Verificar si el usuario es el propietario del tweet
    if (tweet.user.toString() !== userId) {
      return res
        .status(403)
        .send({ error: "Not authorized to edit this tweet" });
    }

    // Actualizar el contenido del tweet
    tweet.content = content;
    const updatedTweet = await tweet.save();

    res.send(updatedTweet);
  } catch (error) {
    res.status(500).send({ error: "Error updating tweet" });
  }
});

// Ruta para eliminar un tweet
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.user.userId;

    // Buscar el tweet
    const tweet = await ModelTweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).send({ error: "Tweet not found" });
    }

    // Verificar si el usuario es el propietario del tweet
    if (tweet.user.toString() !== userId) {
      console.log(
        `User ${userId} is not authorized to delete tweet with ID: ${tweetId}`
      );
      return res
        .status(403)
        .send({ error: "Not authorized to delete this tweet" });
    } else {
      // Eliminar el tweet
      await tweet.deleteOne();

      res.send({ message: "Tweet deleted successfully" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error deleting tweet" });
  }
});

// Ruta para buscar un tweet por contenido o hashtag
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const content = req.query.content; // Obtener el contenido de los query params

    if (!content) {
      return res.status(400).send({ error: 'Content parameter is required' });
    }

    const query = content.startsWith('#') 
    ? { content: { $regex: `#${content.slice(1)}.*`, $options: 'i' } }  // Buscar hashtags que empiecen por la letra específica
    : { content: { $regex: content, $options: 'i' } };

    // Buscar el tweet por contenido o hashtag
    const tweet = await ModelTweet.find(query);

    if (tweet.length === 0) {
      return res.status(404).send({ error: 'Tweet not found' });
    }

    res.send(tweet);
  } catch (error) {
    res.status(500).send({ error: 'Error searching tweet' });
  }
});

module.exports = router;
