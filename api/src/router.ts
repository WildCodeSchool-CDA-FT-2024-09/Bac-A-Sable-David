import express from "express";
import repoControllers from "./repos/repo.resolver"
import statusControllers from "./status/status.controllers";
import languageControllers from "./languages/languages.controllers";


const router = express.Router();

router.use('/repos',repoControllers)
router.use('/status',statusControllers)
router.use('/languages',languageControllers)

export default router