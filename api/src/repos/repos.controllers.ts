import express from "express";
import { Request, Response } from "express";
import { Repo } from "./repo.entity";
import { Status } from "../status/status.entity";
import { validate } from "class-validator";
import { Lang } from "../languages/language.entity";
import { FindOptionsWhere, In } from "typeorm";

// BREAD operations
const browse = async (req: Request, res: Response) => {
  const { name, status ,languages} = req.query;

  // TODO : this is ok but the three filers work like 'OR', when i want them to work like 'AND'. 
  const queryFilters = [];
  if (name) queryFilters.push({ name: name as string });
  if (status) queryFilters.push({ status: {id: parseInt(status as string)} });
  if (languages) {
    const languagesFilters:number[] = (languages as string).replace("[","").replace("]","").split(",").map(el=>parseInt(el))
    queryFilters.push({ languages: {id :In (languagesFilters)}})
  }

  console.log(queryFilters)

  try {
    const result = await Repo.find({
      where: queryFilters as FindOptionsWhere<Repo>,
      relations: { status: true, languages: true},
    });
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
    repo.status = status;

    const langs = await Lang.find({
      where: { id: In(req.body.langs.map((el: number) => el)) },
    });
    repo.languages = langs;

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
