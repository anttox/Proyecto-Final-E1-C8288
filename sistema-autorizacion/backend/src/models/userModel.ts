import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

// Crear un nuevo usuario en la base de datos
export const createUser = async (nombre: string, email: string, contraseña: string, rol: string) => {
  try {
    const query = `
      INSERT INTO usuarios (nombre, email, contraseña, rol, fecha_registro)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [nombre, email, contraseña, rol]);
    return result.rows[0];
  } catch (error: any) {
    console.error('Error en CREATE USER:', error.message);
    throw error;
  }
};

// Buscar un usuario por correo electrónico
export const findUserByEmail = async (email: string) => {
  try {
    const query = 'SELECT * FROM usuarios WHERE email = $1;';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch (error: any) {
    console.error('Error en FIND USER BY EMAIL:', error.message);
    throw error;
  }
};

// Buscar un usuario por ID
export const findUserById = async (id: string) => {
  try {
    const query = 'SELECT * FROM usuarios WHERE id_usuario = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error: any) {
    console.error('Error en FIND USER BY ID:', error.message);
    throw error;
  }
};

// Obtener la lista de todos los usuarios (solo para administradores)
export const getAllUsers = async () => {
  try {
    const query = `
      SELECT id_usuario, nombre, email, rol, fecha_registro
      FROM usuarios
      ORDER BY fecha_registro DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error: any) {
    console.error('Error en GET ALL USERS:', error.message);
    throw error;
  }
};

// Actualizar el perfil de un usuario
export const updateUserProfile = async (id: string, updates: { nombre?: string; email?: string; contraseña?: string }) => {
  try {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (updates.nombre) {
      fields.push(`nombre = $${index++}`);
      values.push(updates.nombre);
    }
    if (updates.email) {
      fields.push(`email = $${index++}`);
      values.push(updates.email);
    }
    if (updates.contraseña) {
      fields.push(`contraseña = $${index++}`);
      values.push(updates.contraseña);
    }

    values.push(id);
    const query = `
      UPDATE usuarios
      SET ${fields.join(', ')}
      WHERE id_usuario = $${index}
      RETURNING *;
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error: any) {
    console.error('Error en UPDATE USER PROFILE:', error.message);
    throw error;
  }
};

// Actualizar el rol de un usuario
export const updateUserRole = async (id: string, rol: string) => {
  try {
    const query = `
      UPDATE usuarios
      SET rol = $1
      WHERE id_usuario = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [rol, id]);

    if (result.rowCount === 0) {
      console.warn(`No se encontró un usuario con ID: ${id} para actualizar el rol.`);
      return null;
    }

    return result.rows[0];
  } catch (error: any) {
    console.error('Error en UPDATE USER ROLE:', error.message);
    throw error;
  }
};

// Eliminar usuario por ID
export const deleteUser = async (id: string) => {
  try {
    const query = 'DELETE FROM usuarios WHERE id_usuario = $1;';
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      console.warn(`No se encontró un usuario con ID: ${id} para eliminar.`);
      return null;
    }

    return { mensaje: `Usuario con ID ${id} eliminado correctamente.` };
  } catch (error: any) {
    console.error('Error en DELETE USER:', error.message);
    throw error;
  }
};
