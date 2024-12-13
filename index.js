import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, User } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', // or a specific array of domains
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
}));


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
    message: "Working updated",
    status: 200,
  });
});

app.listen(3000, () => {
  connectDB(process.env.DATABASE_URL);
  console.log(`Server running on port ${process.env.PORT}`);
});
