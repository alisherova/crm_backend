const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const tasksRouter = require("./routes/task");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let cachedDb = null; // Cache the MongoDB connection

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = db; // Save connection to the cache
  return db;
}

// Ensure database connection before handling any routes
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next(); // Proceed to the next middleware or route
  } catch (err) {
    console.error("Failed to connect to database", err);
    res.status(500).json({ message: "Database connection error", error: err });
  }
});

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/tasks", tasksRouter);

module.exports = app;
