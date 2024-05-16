
router.post('/', (req, res) => {
    //logica para verificacion de usuarios

    // Lógica para autenticar al usuario
    res.send('Autenticación exitosa. Usuario logueado.');
});

module.exports = router;