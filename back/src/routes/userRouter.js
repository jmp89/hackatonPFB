import express from "express";
import { validateUserController } from "../controllers/users/index.js";
import {createEventAdminController} from "../controllers/users/index.js";

const router = express.Router();

router.post("/validate", validateUserController);

router.get("/event", createEventAdminController);

export default router;
