const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose=require('mongoose');
const methodOverride= require("method-override");
const morgan= require("morgan")


const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", ()=> {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
// imports
const Dog = require("./models/dog.js");
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

//GET / serves as landing page
app.get("/", async (req,res) => {
    res.render("main.ejs")
})

app.get("/dogs", async (req, res) => {
    const allDogs = await Dog.find();
    res.render("dogs/index.ejs", {dogs:allDogs})
  });

app.get("/dogs/new", (req,res) => {
    res.render("dogs/new.ejs");
})

app.post("/dogs", async (req,res) => {
    if (req.body.rescueDog === "on"){
        req.body.rescueDog= true;
    } else {
        req.body.rescueDog = false;
    }
    await Dog.create(req.body);
    console.log(req.body);
    res.redirect("/dogs")
})
app.get("/dogs/:dogId", async (req,res) => {
    const foundDog = await Dog.findById(req.params.dogId)
    res.render("dogs/show.ejs", {dog: foundDog});
})

app.delete("/dogs/:dogId", async (req,res) => {
    await Dog.findByIdAndDelete(req.params.dogId)
    res.redirect("/dogs");
})
app.get("/dogs/:dogId/edit", async (req,res) => {
    const foundDog = await Dog.findById(req.params.dogId)
    res.render("dogs/edit.ejs", {
        dog:foundDog,
    });
})
app.put("/dogs/:dogId", async (req,res) => {
    if (req.body.rescueDog === "on") {
        req.body.rescueDog = true;
    } else {
        req.body.rescueDog = false;
    }
    await Dog.findByIdAndUpdate(req.params.dogId, req.body);
    res.redirect(`/dogs/${req.params.dogId}`)
})

app.listen(3000,() => {
    console.log('Listening on port 3000')
});
