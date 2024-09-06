import { Schema, model } from "mongoose";
import { ITodo } from "../../types";

const todoSchema = new Schema<ITodo>(
  {
    task: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export const Todo = model<ITodo>("todo", todoSchema);
