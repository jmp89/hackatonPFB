import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.js';
import path from 'path';
import 'dotenv/config';

import { errorHandler, notFoundHandler } from './middlewares/index.js';
import fileUpload from 'express-fileupload';

const server = express();

// Recursos estáticos
const { UPLOADS_DIR } = process.env;
const PUBLIC_FOLDER = path.join(process.cwd(), String(UPLOADS_DIR));
server.use(express.static(PUBLIC_FOLDER));

server.use(morgan('dev'));
server.use(cors());
server.use(express.json()); //*como me hacia falta, ya lo pongo

server.use(fileUpload());

// Llamado a rutas
server.get('/', (req, res) => {
    res.send('El servidor está funcionando correctamente');
});

server.use(routes);

// Middleware de manejo de errores
server.use(errorHandler);

// Middleware de ruta no encontrada 404
server.use(notFoundHandler);

export default server;
