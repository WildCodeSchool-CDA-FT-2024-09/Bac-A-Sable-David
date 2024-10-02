import express from "express";
import { Request, Response } from "express";
import { Lang } from "./language.entity";
import { validate } from "class-validator";

// BREAD operations
const browse = async (_: Request, res: Response) => {
  try{

    const languages = await Lang.find()
    res.status(200).json(languages);

  }catch (e:any){
    console.log(e)
  }
  
};

const add = async (req: Request, res: Response) => {
  try {
    const lang = new Lang();

    lang.name = req.body.name;

    const error = await validate(lang);

    console.log(error);

    if (error.length) {
      res.status(422).send();
    } else {
      await lang.save();
      res.status(201).json(req.body);
    }
  } catch (e: any) {
    res.status(500).send();
  }
};


// HTTP verbs assciated with this controller
const languageControllers = express.Router();

languageControllers.get("/", browse);
languageControllers.post("/", add);

export default languageControllers;
