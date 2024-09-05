import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Todo } from "./models/todo.model.ts";
import { ITodo } from "./types";

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
const origin = process.env.FRONTEND_ORIGIN;

//middleware
app.use(express.json());
app.use(cors({ origin }));

//routes
app.get("/todo", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({});
    return res.status(200).json({
      length: todos.length,
      data: todos,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.post("/todo", async (req: Request, res: Response) => {
  try {
    const todo: ITodo = {
      task: req.body.task,
      description: req.body.description,
      completed: false,
    };
    await Todo.create(todo);
    return res.status(201).json({ message: "Record created" });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err });
  }
});

//db connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to db");
    app.listen(port, () =>
      console.log(`server running at http://localhost:${port}`)
    );
  })
  .catch((err: Error) => {
    console.error(err);
  });

mongoose.connection.on("error", (err: Error) => {
  console.error(err);
});

mongoose.connection.on("disconnected", () => {
  console.error("Mongoose disconnected");
});
