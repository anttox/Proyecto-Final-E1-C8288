import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel';

// Registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, contraseña, rol } = req.body;

    if (!nombre || !email || !contraseña || !rol) {
      res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
      return;
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ mensaje: 'El correo electrónico ya está registrado.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(contraseña, 12);
    const user = await createUser(nombre, email, hashedPassword, rol);
    res.status(201).json(user);
  } catch (error: any) {
    console.error('Error al registrar el usuario:', error.message);
    res.status(500).json({ mensaje: 'Error al registrar el usuario.', error: error.message });
  }
};

// Iniciar sesión
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, contraseña } = req.body;

    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      res.status(401).json({ mensaje: 'Credenciales incorrectas.' });
      return;
    }

    const token = jwt.sign({ id: user.id_usuario, rol: user.rol }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ mensaje: 'Error al iniciar sesión.', error: error.message });
  }
};
