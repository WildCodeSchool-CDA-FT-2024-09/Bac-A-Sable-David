import express from "express";
import { Request, Response } from "express";
// import z from "zod"; // les zod de barbarie
// import { Repo } from "@/types";
import { Repo } from "./repos.entity"

// BREAD operations
// const browse = (req: Request, res: Response) => {
//   let result = repos;

//   result = req.query.name
//     ? result.filter((el: Repo) =>
//         el.name.toLowerCase().includes(req.query.name as string)
//       )
//     : result;

//   res.status(200).json(result);
// };

// const read = (req: Request, res: Response) => {
//   const result = repos.filter((repo: Repo) => repo.id == req.params.id);

//   if (result.length === 0) {
//     res.status(404).json("No repo was found");
//   } else {
//     res.status(200).json(result[0]);
//   }
// };

const add = async (req: Request, res: Response) => {
  try {
    const repo = new Repo();
    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;
    repo.isPrivate = parseInt(req.body.isPrivate);
  
    await repo.save()
  
    res.status(201).json(req.body);
  } catch (e:any){
    res.status(400).send()
  }
};

// const destroy = (req: Request, res: Response) => {
//   // TODO : here i need to send out 404 if no corresponding repo was found, instead of 204 everytime.
//   repos = repos.filter((el: Repo) => el.id !== req.params.id);
//   res.status(204).json("item deleted succesfully");
// };

//Validate that the body actually is compatible with repos

// Define Zod schema
// const RepoSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   url: z.string(),
// });

// const validateRepo = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     RepoSchema.parse(req.body);
//     next();
//   } catch (e) {
//     res.status(400).json("the data isn't in the right format");
//   }
// };

// HTTP verbs assciated with this controller
const repoControllers = express.Router();

// repoControllers.get("/", browse);
// repoControllers.get("/:id", read);
repoControllers.post("/", add);
// repoControllers.delete("/:id", destroy);

export default repoControllers;
