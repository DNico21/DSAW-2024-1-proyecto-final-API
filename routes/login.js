const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ModelUser = require("../userModel");
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET_KEY || "default_value_if_not_set";

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  try {
    const user = await ModelUser.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    // Configura la cookie con el token JWT
    res.cookie("session_token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.send({ message: "Login successful" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;