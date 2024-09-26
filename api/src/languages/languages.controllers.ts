import express from "express";
import { Request, Response } from "express";
import languages from "../../data/languages.json"

// BREAD operations
const browse = (_: Request, res: Response) => {
  res.status(200).json(languages);
};

// HTTP verbs assciated with this controller
const languageControllers = express.Router();

languageControllers.get("/", browse);

export default languageControllers;
