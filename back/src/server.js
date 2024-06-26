import express from "express";
import morgan from "morgan";
import cors from "cors";

const server = express();

server.use(morgan("dev"));

server.use(cors());

// Llamado a rutas
server.get("/", (req, res) => {
  res.send("El servidor está funcionando correctamente");
});

export default server;
