import dotenv from 'dotenv';
import express from "express";
import router from "./router";

// initialise the .env module
dotenv.config();
const port = process.env.PORT;

const app = express();


app.use(express.json());

app.use("/api", router);

app.listen(port, () =>
  console.log(`server listenning on http:/localhost/${port}`)
);
