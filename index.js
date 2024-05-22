//index.js
const express = require("express");
const login = require("./routes/login");
const profile = require("./routes/profile");
const register = require("./routes/register");
const home = require("./routes/home");
const tweets = require("./routes/tweets");

const cors = require('cors');
const cookieParser = require('cookie-parser')

const dbconnect = require("./config");

const app = express();

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
dbconnect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*', // Permite solicitudes desde cualquier origen
  credentials: true
}));

app.use("/login", login);
app.use("/profile", profile);
app.use("/register", register);
app.use("/tweets", tweets);
app.use("/", home);

app.listen(PORT, () => {
  console.log(`Server ejecutándose en: ${PORT}`);
});