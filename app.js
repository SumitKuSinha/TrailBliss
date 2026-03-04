//requireing packages 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");

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

//list all listings
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
})


//starting the server
app.listen(8080 , ()=>{
    console.log("Sereve is started at http://localhost:8080");
});