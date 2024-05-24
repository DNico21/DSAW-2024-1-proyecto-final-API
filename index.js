//index.js
const express = require("express");
const login = require("./routes/login");
const profile = require("./routes/profile");
const register = require("./routes/register");
const home = require("./routes/home");
const tweets = require("./routes/tweets");
const checkAuth = require("./routes/checkAuth");

const cors = require('cors');
const cookieParser = require('cookie-parser')

const dbconnect = require("./config");

const app = express();

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
dbconnect();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:5173',
  'https://front-6l8g9hz5u-nicolas-urreas-projects.vercel.app',
  'https://front-app-silk.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Check if the incoming origin is allowed
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use("/check-auth", checkAuth);
app.use("/login", login);
app.use("/profile", profile);
app.use("/register", register);
app.use("/tweets", tweets);
app.use("/", home);

app.listen(PORT, () => {
  console.log(`Server ejecutándose en: ${PORT}`);
});