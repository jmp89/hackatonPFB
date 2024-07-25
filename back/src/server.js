import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.js';
import path from 'path';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import { errorHandler, notFoundHandler } from './middlewares/index.js';
import fileUpload from 'express-fileupload';

const server = express();

// Recursos estáticos
const { UPLOADS_DIR, FRONT_URL, FRONT_PORT } = process.env;
const PUBLIC_FOLDER = path.join(process.cwd(), UPLOADS_DIR);
server.use(express.static(PUBLIC_FOLDER));

server.use(morgan('dev'));
server.use(
    cors({
        origin: 'http://' + FRONT_URL + ':' + FRONT_PORT,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);
server.use(cookieParser());
server.use(express.json());

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
