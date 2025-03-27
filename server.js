const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose= require("mongoose");
const morgan = require("morgan");

const app= express();
const port = process.env.PORT || 3000;

// middleware
app.use(morgan("dev"));
app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`)
});

app.get("/", (req,res)=> {
    res.render("main.ejs");
});

//connect dog model
const Dog = require("./models/dog.js");
app.use(express.urlencoded({extended:false}));

// CREATE ROUTE
app.get("/dogs/new", (req,res) => {
    res.render("dogs/new.ejs")
});
    // handle submission
    app.post("/dogs", async (req,res)=> {
        try {
            await Dog.create(req.body);
            res.send(`${req.body.name} submitted!`);
        } catch (err) {
            console.log(err);
            res.send("Error submitting dog")
        }
    })

app.listen(port, () => {
    console.log(`Express ready on port ${port}!`)
});
