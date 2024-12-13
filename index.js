import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, User } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({
  path: "./.env",
});

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();
    console.log("Done");
    return res.json({
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 403,
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Working",
    status: 200,
  });
});

app.listen(3000, () => {
  connectDB(process.env.DATABASE_URL);
  console.log("Server is running on port 3000");
});
