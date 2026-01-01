const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.static("public"));

const PORT = 5050;

// Middleware
app.use(express.json());

// MongoDB config (Docker-friendly)
const MONGO_URL = "mongodb://mongo:27017";
const DB_NAME = "taskboard";

let db;

// Connect to MongoDB first, then start server
MongoClient.connect(MONGO_URL)
  .then(client => {
    db = client.db(DB_NAME);
    console.log("MongoDB connected");

    // GET all tasks
    app.get("/tasks", async (req, res) => {
      const tasks = await db.collection("tasks").find().toArray();
      res.json(tasks);
    });

    // POST new task
    app.post("/tasks", async (req, res) => {
      const task = {
        title: req.body.title,
        completed: false,
        createdAt: new Date()
      };

      await db.collection("tasks").insertOne(task);
      res.json({ message: "Task added successfully" });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
