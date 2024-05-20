const mongoose = require("mongoose")
const dbconnect = () =>{
    mongoose.connect("db",{},(err,res))
}