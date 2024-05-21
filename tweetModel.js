// tweetModel.js
const mongoose = require('mongoose');
const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 280, // Limitar el tweet a 280 caracteres como en Twitter
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', // Referencia al modelo de usuario
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ModelTweet = mongoose.model('tweets', tweetSchema);
module.exports = ModelTweet;