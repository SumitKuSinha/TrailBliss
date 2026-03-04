const mongoose = require("mongoose");
const schema = mongoose.Schema;

//creating schema for listing 
const listingSchema = new schema({
  title : {
    type: String,
    required : true
  },
  description : {
    type: String
  }, 
image: {
  filename: {
    type: String
  },
  url: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2025/12/05/19/54/clouds-9997332_1280.png"
  }
},
  price : {
    type : Number
  }, 
  location : { 
    type : String
  },
  country : {
    type : String
  }
});

//creating model for listing 
const Listing = mongoose.model("Listing",listingSchema);

//export listing

module.exports = Listing;