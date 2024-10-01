import express from "express";
import { Request, Response } from "express";
import { Repo } from "./repo.entity";
import { Status } from "../status/status.entity";
import { validate } from "class-validator";

// BREAD operations
const browse = async (req: Request, res: Response) => {
  try {
    const result = req.query.name
      ? await Repo.find({
          where: { name: req.query.name as string },
          relations: { status: true },
        })
      : await Repo.find({ relations: { status: true } });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).send();
  }
};

const read = async (req: Request, res: Response) => {
  const result = await Repo.findOneBy({ id: req.params.id });

  if (result === null) {
    res.status(404).json("No repo was found");
  } else {
    res.status(200).json(result);
  }
};

const add = async (req: Request, res: Response) => {
  try {
    const repo = new Repo();

    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;

    const status = await Status.findOneOrFail({
      where: [{ id: req.body.status }],
    });

    console.log(status);

    repo.status = status;

    const error = await validate(repo);

    console.log(error);

    if (error.length) {
      res.status(422).send();
    } else {
      await repo.save();
      res.status(201).json(req.body);
    }
  } catch (e: any) {
    res.status(500).send();
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const target = await Repo.findOneBy({ id: req.params.id });
    console.log(target);
    if (target) {
      target.remove();
      res.status(204).json("item deleted succesfully");
    } else {
      res.status(404).send();
    }
  } catch (e: any) {
    console.log(e);
  }
};

// HTTP verbs assciated with this controller
const repoControllers = express.Router();

repoControllers.get("/", browse);
repoControllers.get("/:id", read);
repoControllers.post("/", add);
repoControllers.delete("/:id", destroy);

export default repoControllers;
