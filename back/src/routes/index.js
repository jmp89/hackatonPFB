import express from "express";

import userRouter from "./userRouter.js";

const router = express.Router();

router.use(userRouter);


// Ruta de ejemplo para hacer test del middleware de bodyParser
router.post('/testParser', (req, res) => {
    res.send(req.body);
});

export default router;
