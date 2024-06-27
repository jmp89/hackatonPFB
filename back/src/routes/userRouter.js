import express from "express";

import {
  validateUserController,
  eventRegistrationController,
} from "../controllers/users/index.js";

const router = express.Router();

router
  .post("/validate", validateUserController)
  // Falta un middleware para verificar que el usuario está registrado
  .post("/event-registration", eventRegistrationController);

export default router;
