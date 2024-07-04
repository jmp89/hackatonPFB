import express from "express";

import {
  userRegisterController,
  validateUserController,
  loginUserController,
  editUserPasswordController,
  initiatePasswordRecoveryController,
  resetPasswordController,
  uploadFilesController
} from "../controllers/users/index.js";

import {
  userExists,
  authUser,
  validator,
  authAdmin,
} from "../middlewares/index.js";

const router = express.Router();

// Joi validado hasta /tecnologias, users/password por arreglar
router
  .post("/users/register", userRegisterController)
  .get("/users/validate/:registrationCode", validateUserController)
  .post("/users/login", loginUserController)
  .put("/users/edit-password", editUserPasswordController)
  .post("/users/initiate-password", initiatePasswordRecoveryController)
  .post("/users/reset-password", resetPasswordController)
  .post("/upload", uploadFilesController);

export default router;
