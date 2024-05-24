//checkAuth.js
const express = require("express");
const authMiddleware = require("../authMiddleware");
const ModelUser = require("../userModel");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await ModelUser.findById(req.user.userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});

module.exports = router;