import express from "express";
import listEventsController from "../controllers/entries/listEventsController.js";
import listEventDetailsController from "../controllers/entries/listEventDetailsController.js";
import validateEventParticipationController from "../controllers/entries/validateEventParticipationController.js";
import eventRegistrationController from "../controllers/entries/eventRegistrationController.js";
import createEventAdminController from "../controllers/entries/createEventAdminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import listEventCategoriesController from "../controllers/entries/listEventCategoriesController.js";
<<<<<<< Updated upstream
import initiatePasswordRecoveryController from "../controllers/users/initiatePasswordRecoveryController.js";
import resetPasswordController from "../controllers/users/resetPasswordController.js";
=======
import eventUnlistController from "../controllers/entries/eventUnlistController.js";
import authUser from "../middlewares/authUser.js";
>>>>>>> Stashed changes

const router = express.Router();

// Validaciones Joi hasta event/tematicas
router
  .get("/entries/search", listEventsController)
  .get("/entries/:eventID", listEventDetailsController)
  .post("/event", authAdmin, createEventAdminController)
  .post("/event/register", authUser, eventRegistrationController)
  .delete("/event/unlist", authUser, eventUnlistController)
  .get("/event/confirm/:eventCode", validateEventParticipationController)
  .get("/event/categories", listEventCategoriesController)
  .post("/users/initiate-password", initiatePasswordRecoveryController)
  .post("/users/reset-password", resetPasswordController);

export default router;
