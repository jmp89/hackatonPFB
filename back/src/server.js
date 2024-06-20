import express from "express";
import morgan from "morgan";

const server = express();

server.use(morgan("dev"));

// Llamado a rutas
server.get("/", (req, res) => {
  res.send("El servidor está funcionando correctamente");
});

export default server;
