import express, { type Router, Request, Response } from "express";
import { todoController } from "./todo.controller.ts";

const todoRouter: Router = express.Router();

todoRouter.get("/", todoController.getTodos);
todoRouter.post("/", todoController.createTodo);

export default todoRouter;
