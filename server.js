const dotenv = require("dotenv").config()
const express = require("express")
const mongoose =require("mongoose")
const methodOverride = require("method-override"); 
const morgan = require("morgan"); 
const app = express();
const path = require("path")


//connection to db
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected",()=>{
    console.log(`connect to MONGODB ${mongoose.connection.name}`)
})

//MIDDLEWARE
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 


//controllers
const carController = require("./controllers/carController")

app.use("/cars", carController)

//get test
app.get("/" , (req,res) =>{
    res.render("test.ejs")
})

app.listen(3000, ()=>{
    console.log("listening port 3000")
})