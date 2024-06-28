import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js";

import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/index.js";

const server = express();

server.use(morgan("dev"));
server.use(cors());
server.use(express.json()); //*como me hacia falta, ya lo pongo

// Llamado a rutas
server.get("/", (req, res) => {
  res.send("El servidor está funcionando correctamente");
});

server.use("/", routes);

// Middleware de manejo de errores
server.use(errorHandler);

// Middleware de ruta no encontrada 404
server.use(notFoundHandler);

export default server;
