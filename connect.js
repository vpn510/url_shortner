import mongoose from "mongoose";
async function connectDB(url) {
   return await mongoose.connect(url)
}

export default connectDB;
