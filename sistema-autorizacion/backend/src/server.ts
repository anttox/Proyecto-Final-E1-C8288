import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import resourceRoutes from './routes/resourceRoutes';
import logRoutes from './routes/logRoutes';
import logAction from './middlewares/logMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import errorHandler from './middlewares/errorHandler';
import pool from './config';
import { createTables } from './init-db';

// Seleccionar el archivo .env según el entorno
const envFile = process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env.local';
dotenv.config({ path: envFile });

const app = express();

// Crear tablas automáticamente
createTables();

// Probar conexión a PostgreSQL
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error al conectar a PostgreSQL:', err.message);
    } else {
        console.log('Conexión exitosa a PostgreSQL');
    }
    release();
});

// Configuración de middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4000', // Configurable
    credentials: true,
}));
app.use(express.json());

// Ruta base
app.get('/', (req: Request, res: Response) => {
    res.send({ mensaje: 'Servidor corriendo correctamente' });
});

// Rutas protegidas con middlewares
app.use('/api/users', authMiddleware, logAction, userRoutes);
app.use('/api/resources', authMiddleware, logAction, resourceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/logs', authMiddleware, logRoutes);

// Manejo de errores
app.use(errorHandler);

// Ruta no encontrada (404)
app.use((req: Request, res: Response) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT_BACKEND || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
