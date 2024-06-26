import express from "express";
import { validateUserController } from "../controllers/users/index.js";

const router = express.Router();

router.post("/validate", validateUserController);

export default router;
