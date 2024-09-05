import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("app");
});

app.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);
