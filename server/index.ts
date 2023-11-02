import express, { Express, Request, Response } from "express";

import path from "path";

import dotenv from "dotenv";

import cors from "cors";

import slidesData from "./database/data.json";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get("/api/slides", (_req: Request, res: Response) => {
  res.json(slidesData);
});

app.use(express.static(path.join(__dirname, "./database")));

app.listen(port, () => {
  console.log(`Server is running on port ${port ?? ""}`);
});
