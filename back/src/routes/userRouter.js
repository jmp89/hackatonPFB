import express from "express";

import {
  userRegisterController,
  validateUserController,
  loginUserController,
  editUserPasswordController,
  initiatePasswordRecoveryController,
  resetPasswordController,
  uploadFilesController,
  rateUserEvent
} from "../controllers/users/index.js";

import {
  authUser
} from "../middlewares/index.js";

const router = express.Router();

// Joi validado hasta /tecnologias, users/password por arreglar
router
  .post("/users/register", userRegisterController)
  .get("/users/validate/:registrationCode", validateUserController)
  .post("/users/login", loginUserController)
  .put("/users/edit-password", authUser, editUserPasswordController)
  .post("/users/initiate-password", initiatePasswordRecoveryController)
  .post("/users/reset-password", resetPasswordController)
  .post("/upload", authUser, uploadFilesController)
  .post("/users/rate-event", rateUserEvent)

export default router;
