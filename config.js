// config.js
const mongoose = require("mongoose");
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const dbconnect = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión correcta");
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

module.exports = dbconnect;
