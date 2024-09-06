import express, { type Router, Request, Response } from "express";
import { todoController } from "./todo.controller.ts";

const todoRouter: Router = express.Router();
const { getTodos, createTodo, editTodo, deleteTodo } = todoController;

todoRouter.get("/", getTodos);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", editTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
