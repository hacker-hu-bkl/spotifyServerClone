import mongoose from "mongoose";

async function connectDB(param) {
  try {
    const connection = await mongoose.connect(`${param}`);
    console.log(connection.connection.db.databaseName);
  } catch (error) {
    console.error(error);
  }
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

export { User, userSchema, connectDB };
