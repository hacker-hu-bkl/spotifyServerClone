import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, User } from "./db.js";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "https://www.metaspotify.site",
  methods: ["GET", "POST"], // Define allowed HTTP methods
  credentials: true,       // Enable credentials if required
};


dotenv.config({
  path: "./.env",
});

app.use(cors(corsOptions));

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
