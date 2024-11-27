import { Request, Response } from 'express';
import { findUserById, getAllUsers, updateUserProfile, deleteUser, updateUserRole } from '../models/userModel';
import logger from '../utils/logger';

// Obtener perfil del usuario
export const getUserProfile = async (userId: string): Promise<any> => {
  try {
    logger.info(`Buscando perfil del usuario con ID: ${userId}`);
    const user = await findUserById(userId);

    if (!user) {
      logger.warn(`Usuario con ID ${userId} no encontrado`);
      return null;
    }

    logger.info(`Perfil del usuario con ID ${userId} obtenido`);
    return user;
  } catch (error) {
    logger.error(`Error al buscar el perfil del usuario con ID ${userId}:`, error);
    throw new Error('Error interno del servidor');
  }
};

// Obtener todos los usuarios (para administradores)
export const getAllUsersController = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (req.user?.rol !== 'Administrador') {
      return res.status(403).json({ mensaje: 'Acceso denegado. Se requiere rol de Administrador.' });
    }

    const users = await getAllUsers();
    if (!users.length) {
      return res.status(404).json({ mensaje: 'No se encontraron usuarios.' });
    }

    return res.status(200).json(users);
  } catch (error) {
    logger.error('Error al obtener lista de usuarios:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar perfil del usuario
export const updateUserProfileController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.id;
    const updates = req.body;

    if (!userId) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    const updatedUser = await updateUserProfile(userId.toString(), updates);
    return res.status(200).json({ mensaje: 'Perfil actualizado correctamente', usuario: updatedUser });
  } catch (error) {
    logger.error('Error al actualizar perfil:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar usuario (sólo administradores)
export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    if (req.user?.rol !== 'Administrador') {
      return res.status(403).json({ mensaje: 'Acceso denegado. Solo administradores pueden eliminar usuarios.' });
    }

    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    return res.status(200).json({ mensaje: 'Usuario eliminado correctamente.' });
  } catch (error) {
    logger.error('Error al eliminar usuario:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

// Actualizar rol de usuario
export const updateUserRoleController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { rol } = req.body;

    if (req.user?.rol !== 'Administrador') {
      return res.status(403).json({ mensaje: 'Acceso denegado. Solo Administradores pueden cambiar roles.' });
    }

    if (!rol || (rol !== 'Administrador' && rol !== 'Operador')) {
      return res.status(400).json({ mensaje: 'Rol inválido. Debe ser "Administrador" o "Operador".' });
    }

    const updatedUser = await updateUserRole(id, rol);
    if (!updatedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    return res.status(200).json({ mensaje: 'Rol actualizado correctamente.', usuario: updatedUser });
  } catch (error) {
    logger.error('Error al actualizar rol:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

