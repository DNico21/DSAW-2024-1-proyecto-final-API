// profile.js
const express = require('express');
const ModelUser = require('../userModel');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

// Usar el middleware de autenticación
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Obtener el userId del token
    const userId = req.user.userId;
    // Buscar al usuario en la base de datos por su ID
    const user = await ModelUser.findById(userId).select('-password'); // Excluir la contraseña de la respuesta

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;
