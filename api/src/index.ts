import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import router from "./router";
import "reflect-metadata";
import { dataSource } from '../database/db';

// initialise the .env module
dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL as string, 
    ]
  })
);

app.use(express.json());

app.use("/api", router);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`server listenning on http:/localhost/${port}`)
}
);
