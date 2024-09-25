import express from "express";
import repoControllers from "./repos/repos.controllers"


const router = express.Router();

router.use('/repos',repoControllers)

export default router