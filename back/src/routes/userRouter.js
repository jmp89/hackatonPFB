import express from "express";

import {
  userRegisterController,
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
import uploadFiles from "../middlewares/uploadFiles.js";

import listTechnologies from "../controllers/entries/technologyListController.js";

const router = express.Router();

router
  .post("/users/register", userRegisterController)
  .get("/users/validate/:registrationCode", validateUserController)
  .post("/users/login", loginUserController)
  .put("/users/password", editUserPasswordController)
  .post("/event", authAdmin, createEventAdminController)
  .post("/event/register", eventRegistrationController);


router.post("/validate", validateUserController);

router.post("/upload", uploadFiles);
router.get("/tecnologias", listTechnologies);

export default router;
