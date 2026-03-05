//requireing packages 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");
app.use(methodOverride("_method"));

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
    const x = `<a href="http://localhost:8080/listings"><button>Listings</button><a>`
    res.send(x);
})

//list all listings (index route)
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
});

// NEW route
app.get("/listings/new" , async(req , res)=>{
    res.render("listings/new.ejs");
});

//show details route

app.get("/listings/:id" , async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs" , {listing});
});

// create route
app.post("/listings" , async(req,res)=>{
const newListing = new Listing(req.body.listing);
await newListing.save();
res.redirect("/listings");
});

//Edit route
app.get("/listings/:id/edit" , async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
});

//Update route
app.put("/listings/:id" , async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//starting the server
app.listen(8080 , ()=>{
    console.log("Sereve is started at http://localhost:8080");
});