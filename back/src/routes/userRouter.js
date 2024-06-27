import express from "express";
import {
  validateUserController,
  loginUserController,
} from "../controllers/users/index.js";

const router = express.Router();

router.get("/users/validate/:registrationCode", validateUserController);

router.post("/users/login", loginUserController);

export default router;
