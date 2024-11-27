import { Pool } from 'pg';
import dotenv from 'dotenv';
import logger from './utils/logger'; // Para registrar logs

dotenv.config();

// Seleccionar el archivo .env según el entorno
const envFile = process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env.local';
dotenv.config({ path: envFile });

// Validar variables de entorno
const requiredEnvVars = ['DB_USER', 'DB_PASS', 'DB_HOST', 'DB_NAME', 'DB_PORT'];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    logger.error(`Falta la variable de entorno: ${key}`);
    throw new Error(`Falta la variable de entorno: ${key}`);
  }
});

// Crear el pool de conexiones
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

// Manejo de errores del pool
pool.on('error', (err) => {
  logger.error('Error en el pool de conexiones de PostgreSQL:', err.message);
});

// Log de conexión exitosa
logger.info('Conexión a PostgreSQL configurada correctamente');

// Exportar el pool para usarlo en otras partes del proyecto
export default pool;
