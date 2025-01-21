const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], required: false },
  status: {
    type: String,
    enum: ["New", "Pending", "InProgress", "Completed"],
    required: false,
  },
  avatar: { type: String, default: null },
  isChecked: { type: Boolean, default: false },
  date: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
