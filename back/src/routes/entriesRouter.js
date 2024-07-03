import express from "express";
import listEventsController from "../controllers/entries/listEventsController.js";
import listEventDetailsController from "../controllers/entries/listEventDetailsController.js";
import validateEventParticipationController from "../controllers/entries/validateEventParticipationController.js";
import eventRegistrationController from "../controllers/entries/eventRegistrationController.js";
import createEventAdminController from "../controllers/entries/createEventAdminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import listEventCategoriesController from "../controllers/entries/listEventCategoriesController.js";
import initiatePasswordRecoveryController from "../controllers/users/initiatePasswordRecoveryController.js";
import resetPasswordController from "../controllers/users/resetPasswordController.js";

const router = express.Router();

// Validaciones Joi hasta event/tematicas
router
  .get("/entries/search", listEventsController)
  .get("/entries/:eventID", listEventDetailsController)
  .post("/event", authAdmin, createEventAdminController)
  .post("/event/register", eventRegistrationController)
  .get("/event/confirm/:eventCode", validateEventParticipationController)
  .get("/event/categories", listEventCategoriesController)
  .post("/users/initiate-password", initiatePasswordRecoveryController)
  .post("/users/reset-password", resetPasswordController);

export default router;
