import express from "express";

import {
  validateUserController,
  eventRegistrationController,
} from "../controllers/users/index.js";
import {createEventAdminController} from "../controllers/users/index.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

router.post("/validate", validateUserController);

router.post("/event", authAdmin, createEventAdminController)

export default router;
