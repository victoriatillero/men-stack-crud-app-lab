const mongoose= require("mongoose");

const dogSchema=new mongoose.Schema({
    name: {type: String, required:true},
    breed: {type: String, required:true},
    rescueDog: Boolean,
    pupsonality: String,
});

const Dog= mongoose.model("Dog", (dogSchema));

module.exports= Dog
