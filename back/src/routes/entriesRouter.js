import express from "express";
import listEventsController from "../controllers/entries/listEventsController.js";
import listEventDetailsController from "../controllers/entries/listEventDetailsController.js";

const router = express.Router();

router
    .get("/entries/search", listEventsController)
    .get("/entries/:eventID", listEventDetailsController);

export default router;