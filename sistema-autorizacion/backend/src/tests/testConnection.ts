import pool from '../config';

const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa a PostgreSQL:', result.rows);
  } catch (error: any) {
    console.error('Error al conectar a PostgreSQL:', error.message);
  }
};

testConnection();
