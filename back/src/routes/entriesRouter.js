import express from "express";
import listEventsController from "../controllers/entries/listEventsController.js";
import listEventDetailsController from "../controllers/entries/listEventDetailsController.js";
import validateEventParticipationController from "../controllers/entries/validateEventParticipationController.js";
import eventRegistrationController from "../controllers/entries/eventRegistrationController.js";
import { createEventAdminController } from "../controllers/users/index.js";
import listEventTematicasController from "../controllers/entries/listEventTematicasController.js";

const router = express.Router();

router
  .get("/entries/search", listEventsController)
  .get("/entries/:eventID", listEventDetailsController)
  //   .post("/event", authAdmin, createEventAdminController)
  .post("/event/register", eventRegistrationController)
  .get("/event/confirm/:eventCode", validateEventParticipationController)
  .get("/event/tematicas", listEventTematicasController);
  

export default router;
