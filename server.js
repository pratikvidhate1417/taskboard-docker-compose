const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 5050;

app.use(express.json());
app.use(express.static("public"));

const MONGO_URL = "mongodb://mongo:27017";
const DB_NAME = "taskboard";

let db;

MongoClient.connect(MONGO_URL)
  .then(client => {
    db = client.db(DB_NAME);
    console.log("MongoDB connected");

    // Get all tasks
    app.get("/tasks", async (req, res) => {
      const tasks = await db.collection("tasks").find().toArray();
      res.json(tasks);
    });

    // Add new task
    app.post("/tasks", async (req, res) => {
      await db.collection("tasks").insertOne({
        title: req.body.title,
        completed: false,
        createdAt: new Date()
      });
      res.json({ message: "Task added" });
    });

    // Mark task completed
    app.patch("/tasks/:id", async (req, res) => {
      await db.collection("tasks").updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { completed: true } }
      );
      res.json({ message: "Task completed" });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
