import express from "express";
import { validateUserController } from "../controllers/users/index.js";
import {createEventAdminController} from "../controllers/users/index.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/validate", validateUserController);

router.post("/event", authAdmin, createEventAdminController);

export default router;
