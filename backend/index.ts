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
  const todos = await Todo.find({});
  return res.status(200).send({
    length: todos.length,
    data: todos,
  });
});

app.post("/todo", async (req: Request, res: Response) => {
  try {
    const todo: ITodo = {
      task: req.body.task,

      completed: false,
    };
    await Todo.create(todo);
    return res.status(201).send("Success");
  } catch (err) {
    console.log(err.name);
    if (err.name === "ValidatorError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: err });
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
