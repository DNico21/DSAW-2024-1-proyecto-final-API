//login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ModelUser = require("../userModel");
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET_KEY || "default_value_if_not_set";

router.post("/", async (req, res) => {
  const { UserOrEmail, password } = req.body;

  if (!UserOrEmail || !password) {
    return res.status(400).send({ error: "Email/Username and password are required" });
  }

  try {
    var user = await ModelUser.findOne({ email: UserOrEmail });
    if (!user) {
      user = await ModelUser.findOne({ name: UserOrEmail });
    }

    if (!user) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

    // Configura la cookie con una duración de 1 hora
    return res.status(200).json({ msg: "Logged successfully", token });

    
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;