import mongoose from "mongoose";

async function dbConnection() {
   await mongoose.connect("mongodb+srv://brunovinicius082005:OS48HeNTKLIy9KCI@cluster0.jbcbu9w.mongodb.net/?retryWrites=true&w=majority")
}

export default dbConnection