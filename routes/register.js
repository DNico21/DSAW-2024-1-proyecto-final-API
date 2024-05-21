//register.js
const express = require('express');
const ModelUser = require('../userModel');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelUser.create(body);
        res.status(201).send(respuesta);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;