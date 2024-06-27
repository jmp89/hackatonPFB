import express from "express";
import morgan from "morgan";
import cors from "cors";
import { jsonParser } from './middlewares/bodyParser.js';
import routes from "./routes/index.js";

const server = express();

server.use(morgan("dev"));
server.use(cors());
server.use(express.json()); //*como me hacia falta, ya lo pongo

// Llamado a rutas
server.get("/", (req, res) => {
  res.send("El servidor está funcionando correctamente");
});

server.use('/', routes);

/**Middleware de manejo de errores */
server.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

/**Middleware de ruta no encontrada 404 */
server.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

// Middleware de parseo del body
server.use(jsonParser);

export default server;
