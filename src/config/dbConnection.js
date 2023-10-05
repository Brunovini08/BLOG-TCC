import mongoose from "mongoose";

async function dbConnection() {
   await mongoose.connect(process.env.URL_MONGO)
}

export default dbConnection