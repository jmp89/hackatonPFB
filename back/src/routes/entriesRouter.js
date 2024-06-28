import express from "express";
import listEventsController from "../controllers/entries/listEventsController.js";

const router = express.Router();

router.get("/entries/search", listEventsController);

export default router;