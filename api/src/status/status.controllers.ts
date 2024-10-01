import express from "express";
import { Request, Response } from "express";
import { Status } from "./status.entity";
import { validate } from "class-validator";

// BREAD operations
const add = async (req: Request, res: Response) => {
  try {
    const status = new Status();

    status.name = req.body.name;

    const error = await validate(status);

    if (error.length) {
      res.status(422).send();
    } else {
      await status.save();
      res.status(201).json(req.body);
    }
  } catch (e: any) {
    res.status(500).send();
  }
};


// HTTP verbs assciated with this controller
const statusControllers = express.Router();

statusControllers.post("/", add);

export default statusControllers;
