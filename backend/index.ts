import "dotenv/config";
import express, { type Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRouter from "./src/api/todo/todo.route.ts";

const app: Express = express();
const port: string = process.env.PORT;
const uri: string = process.env.MONGO_URI;
const origin: string = process.env.FRONTEND_ORIGIN;

//middleware
app.use(express.json());
app.use(cors({ origin }));

//routes
app.use("/todo", todoRouter);

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
