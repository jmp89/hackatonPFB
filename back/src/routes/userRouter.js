import express from "express";

import {
  validateUserController,
  eventRegistrationController,
  loginUserController,
  editUserPasswordController,
} from "../controllers/users/index.js";

import { createEventAdminController } from "../controllers/users/index.js";
import {
  userExists,
  authUser,
  validator,
  authAdmin,
} from "../middlewares/index.js";

const router = express.Router();

router.get("/users/validate/:registrationCode", validateUserController);

router.post("/event", authAdmin, createEventAdminController);

router.post("/users/login", loginUserController);

router.put("/users/password", editUserPasswordController);

export default router;
