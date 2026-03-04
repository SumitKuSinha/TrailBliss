const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/trailbliss";
main().then(()=>{
    console.log("Database is connected!");
}).catch((err)=>{
    console.log("Data base error has occured ! " , err);
});

async function main(){
    await mongoose.connect(mongo_url);
}

const initDb = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data is initialized");
}

initDb();