import express from "express";

import {
  validateUserController,
  eventRegistrationController,
  loginUserController,
} from "../controllers/users/index.js";

import { createEventAdminController } from "../controllers/users/index.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

router.get("/users/validate/:registrationCode", validateUserController);

router.post("/event", authAdmin, createEventAdminController);

router.post("/users/login", loginUserController);

export default router;
