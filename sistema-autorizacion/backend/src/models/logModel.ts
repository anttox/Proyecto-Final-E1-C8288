import pool from '../config';

export const createLog = async (id_usuario: number, accion: string, ip_origen: string) => {
    console.log('createLog llamado con:', { id_usuario, accion, ip_origen });
    const query = `INSERT INTO logs (id_usuario, accion, ip_origen) VALUES ($1, $2, $3) RETURNING *`;
    const values = [id_usuario, accion, ip_origen];
    const result = await pool.query(query, values);
    return result.rows[0];
};
  

export const getLogs = async () => {
  const query = `SELECT * FROM logs ORDER BY fecha_hora DESC`;
  const result = await pool.query(query);
  return result.rows;
};
