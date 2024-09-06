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

  public editTodo: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const { task, description, completed }: ITodo = req.body;
      if (
        task === undefined ||
        description === undefined ||
        completed === undefined
      )
        return res.status(400).json({ error: "Missing fields" });
      await Todo.findByIdAndUpdate(id, req.body);
      res.status(200).send({ message: "Record updated succesfully" });
    } catch (err) {
      if (err.name === "CastError") res.status(400);
      else res.status(500);
      res.json({ error: err });
    }
  };

  public deleteTodo: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findByIdAndDelete(id);

      res
        .status(200)
        .json({ Message: `Task '${todo.task}' deleted successfully` });
    } catch (err) {
      if (err.name === "CastError")
        return res.status(404).send(`Todo not found`);
      res.status(500).send(err);
    }
  };
}

export const todoController = new TodoController();
