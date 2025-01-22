const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();

    const groupedTasks = tasks.reduce((acc, task) => {
      if (!acc[task.date]) {
        acc[task.date] = {
          date: task.date,
          badgeCount: 0,
          tasks: [],
        };
      }
      acc[task.date].tasks.push(task);
      acc[task.date].badgeCount += 1;
      return acc;
    }, {});

    const groupedTasksArray = Object.values(groupedTasks);

    res.status(200).json(groupedTasksArray);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, priority, status, avatar, isChecked, date } =
      req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const task = new Task({
      title,
      description,
      priority,
      status,
      avatar,
      isChecked,
      date,
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
});

module.exports = router;
