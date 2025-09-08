import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import chartRoute from "./Routes/chartRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Root test route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Chart routes
app.use("/api/chart", chartRoute);

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB and start server
mongoose.connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
