import mongoose from "mongoose";

function connectDB(url){
    mongoose.connect(url)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((error)=>{
        console.error("Error:", error);
    });
}

export default connectDB;