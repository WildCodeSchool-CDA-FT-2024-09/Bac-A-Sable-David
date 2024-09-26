import express from "express";
import repoControllers from "./repos/repos.controllers"
import languageControllers from "./languages/languages.controllers";


const router = express.Router();

router.use('/repos',repoControllers)
router.use('/languages',languageControllers)

export default router