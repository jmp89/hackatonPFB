import express from "express";

import {
  validateUserController,
  eventRegistrationController,
} from "../controllers/users/index.js";
import {createEventAdminController} from "../controllers/users/index.js";
import authAdmin from "../middlewares/authAdmin.js";
import uploadFiles from "../middlewares/uploadFiles.js";


const router = express.Router();

router.post("/validate", validateUserController);

router.post("/event", authAdmin, createEventAdminController)

router
  .post("/validate", validateUserController)
  // Falta un middleware para verificar que el usuario está registrado
  .post("/event-registration", eventRegistrationController);

router.post('/upload', uploadFiles);


export default router;
