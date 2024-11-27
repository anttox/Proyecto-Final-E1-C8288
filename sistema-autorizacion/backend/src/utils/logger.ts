import { createLogger, format, transports } from 'winston';
import path from 'path';

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'info', // Nivel de log basado en el entorno
  format: format.combine(
    format.timestamp(), // Agrega marca de tiempo a cada log
    format.errors({ stack: true }), // Muestra el stacktrace en los errores
    format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `${timestamp} [${level.toUpperCase()}]: ${message} - ${stack}`
        : `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Imprime logs en consola
    new transports.File({
      filename: path.join('logs', 'errors.log'),
      level: 'error',
    }), // Logs de errores en un archivo
    new transports.File({ filename: path.join('logs', 'combined.log') }), // Todos los logs combinados
  ],
});

// Manejo de excepciones no controladas
logger.exceptions.handle(
  new transports.File({ filename: path.join('logs', 'exceptions.log') }) // Excepciones no controladas
);

// Manejo de promesas no rechazadas
process.on('unhandledRejection', (reason: any) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

export default logger;
