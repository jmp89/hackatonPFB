import express from "express";

import {
  validateUserController,
  eventRegistrationController,
  loginUserController,
  editUserPasswordController,
  createEventAdminController,
} from "../controllers/users/index.js";

import {
  userExists,
  authUser,
  validator,
  authAdmin,
} from "../middlewares/index.js";

const router = express.Router();

router
  .get("/users/validate/:registrationCode", validateUserController)
  .post("/users/login", loginUserController)
  .put("/users/password", editUserPasswordController)
  .post("/event", authAdmin, createEventAdminController)
  .post("/event-registration", eventRegistrationController);

export default router;
