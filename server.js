const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const tasksRouter = require("./routes/task");
const backendUrl = process.env.BACKEND_URL;

dotenv.config(); // Load environment variables

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Mount the tasks route
app.use("/tasks", tasksRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on ${backendUrl}`);
});

module.exports = app;
