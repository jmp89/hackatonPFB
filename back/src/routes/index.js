import express from "express";
import entriesRouter from "./entriesRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use(entriesRouter);
router.use(userRouter);

router.post('/testParser', (req, res) => {
    res.send(req.body);
});

export default router;
