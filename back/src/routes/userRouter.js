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
import uploadFiles from "../middlewares/uploadFiles.js";
import listTechnologies from "../controllers/entries/technologyListController.js";


const router = express.Router();

router
  .get("/users/validate/:registrationCode", validateUserController)
  .post("/users/login", loginUserController)
  .put("/users/password", editUserPasswordController)
  .post("/event", authAdmin, createEventAdminController)
  .post("/event-registration", eventRegistrationController);

router
  .post("/validate", validateUserController)
  // Falta un middleware para verificar que el usuario está registrado
  .post("/event-registration", eventRegistrationController);

router.post('/upload', uploadFiles);
router.get('/tecnologias',listTechnologies)


export default router;
