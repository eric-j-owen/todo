import { RequestHandler } from "express";
import { Todo } from "./todo.model.ts";
import { ITodo } from "../../types";

class TodoController {
  public getTodos: RequestHandler = async (req, res) => {
    try {
      const todos = await Todo.find({});
      res.status(200).json({
        length: todos.length,
        data: todos,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

  public createTodo: RequestHandler = async (req, res) => {
    try {
      const todo: ITodo = {
        task: req.body.task,
        description: req.body.description,
        completed: false,
      };
      await Todo.create(todo);
      res.status(201).json({ message: "Record created" });
    } catch (err) {
      if (err.name === "ValidationError") res.status(400);
      else res.status(500);
      res.json({ error: err });
    }
  };
}

export const todoController = new TodoController();
