//index.js
const express = require('express');
const login = require('./routes/login');
const profile = require('./routes/profile');
const register = require('./routes/register');
const home = require('./routes/home');
const PORT = process.env.PORT || 8000;
const app = express();

app.get('/', (req, res) => {
  res.send('Prueba');
});

app.use(express.json());
app.use('/login', login);
app.use('/profile', profile);
app.use('/register', register);
app.use('/', home);

app.listen(PORT, () => {
  console.log(`Server ejecutandose en: ${PORT}`);
});
