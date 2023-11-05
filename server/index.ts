import express, { Express, Request, Response } from "express";

import path from "path";

import cors from "cors";

import slidesData from "./database/data.json";

const app: Express = express();
const port = 5000;

app.use(cors());

app.get("/api/slides", (_req: Request, res: Response) => {
  res.json(slidesData);
});
app.use(express.static(path.join(__dirname, "./database")));

app.listen(port, () => {
  console.log(`Server is running on port ${port ?? ""}`);
});
