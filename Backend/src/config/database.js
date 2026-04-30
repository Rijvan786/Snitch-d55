import mongoose from "mongoose";
import { config } from "./config.js";


console.log(config.MONGO_URI);


const connectDB = async () => {
  if (!config.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in .env');
  }

  await mongoose.connect(config.MONGO_URI);

  console.log('Connected to MongoDB');
};


export default connectDB;
