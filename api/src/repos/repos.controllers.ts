import express from "express";
import { Request, Response } from "express";
import repos from "../../data/repo.json";
import { Repo } from "@/types";

const browse = (_: Request, res: Response) => {
  res.status(200).json(repos);
};

const read = (req: Request, res: Response) => {
  const result = repos.filter((repo: Repo) => repo.id == req.params.id);

  if (result.length === 0) {
    res.status(404).json('No repo was found');
  } else {
    res.status(200).json(result[0])
  }
};

// HTTP verbs assciated with this controller
const repoControllers = express.Router();

repoControllers.get("/", browse);
repoControllers.get("/:id", read);

export default repoControllers;
