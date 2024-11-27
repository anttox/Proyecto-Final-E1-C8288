import pool from './config';

export const createTables = async () => {
  try {
    // Verificar conexión
    console.log('Verificando conexión a la base de datos...');
    const result = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa a la base de datos:', result.rows[0]);

    console.log('Iniciando la creación de tablas...');

    // Crear tabla de usuarios
    console.log('Validando la tabla "usuarios"...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
          id_usuario SERIAL PRIMARY KEY,
          nombre VARCHAR(50) NOT NULL,
          email VARCHAR(50) UNIQUE NOT NULL,
          contraseña VARCHAR(255) NOT NULL,
          rol VARCHAR(20) NOT NULL CHECK (rol IN ('Administrador', 'Operador')),
          fecha_registro TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Tabla "usuarios" validada o creada.');

    // Crear tabla de recursos
    console.log('Validando la tabla "recursos"...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recursos (
          id_recurso SERIAL PRIMARY KEY,
          tipo_recurso VARCHAR(50) NOT NULL,
          configuracion TEXT NOT NULL,
          estado VARCHAR(20) NOT NULL CHECK (estado IN ('Activo', 'Inactivo')),
          fecha_creacion TIMESTAMP DEFAULT NOW(),
          id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE
      );
    `);
    console.log('Tabla "recursos" validada o creada.');

    // Crear tabla de logs
    console.log('Validando la tabla "logs"...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS logs (
          id_log SERIAL PRIMARY KEY,
          id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
          accion TEXT NOT NULL,
          fecha_hora TIMESTAMP DEFAULT NOW(),
          ip_origen VARCHAR(50) NOT NULL
      );
    `);
    console.log('Tabla "logs" validada o creada.');

    // Crear índices opcionales
    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_email_usuario ON usuarios (email);
    `);
    console.log('Índice único para "email" en "usuarios" validado o creado.');
  } catch (error: any) {
    console.error('Error al crear las tablas:', error.message);
  }
};
