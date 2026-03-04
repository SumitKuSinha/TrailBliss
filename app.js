//requireing packages 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

//mongoose connection 
const mongo_url = "mongodb://127.0.0.1:27017/trailbliss";

main().then(()=>{
    console.log("Data base is connected");
}).catch((err)=>{
    console.log("Data base error has occured !" , err);
});

async function main(){
    await mongoose.connect(mongo_url);
}

//home route
app.get("/" , (req , res)=>{
    res.send("working....");
})

//test listing route
app.get("/testinglist" , async (req, res)=>{
    let sample = new Listing({
      title:"My new villa",
      description : "By the beach",
      price : 1220,
      location : "calangute , Goa",
      country : "India"
    });
    await sample.save();
    console.log("Data is saved...");
    res.send("Data is saved");
});


//starting the server
app.listen(8080 , ()=>{
    console.log("Sereve is started at http://localhost:8080");
});