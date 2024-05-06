const express = require('express');
const app = express();
const PORT = 3000; // Puedes cambiar el puerto si es necesario

// Endpoint para el login
app.get('/login', (req, res) => {
    // Lógica para autenticar al usuario
    res.send('Autenticación exitosa. Usuario logueado.');
});

// Endpoint para el registro
app.post('/register', (req, res) => {
    // Lógica para registrar un nuevo usuario
    res.send('Usuario registrado exitosamente.');
});

// Endpoint para la página principal
app.get('/home', (req, res) => {
    // Lógica para mostrar la página principal
    res.send('¡Bienvenido a la página principal!');
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});