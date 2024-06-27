import express from "express";

import {
  validateUserController,
  eventRegistrationController,
} from "../controllers/users/index.js";
import {createEventAdminController} from "../controllers/users/index.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/validate", validateUserController);

export default router;
