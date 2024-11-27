import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { 
  getUserProfile, 
  getAllUsersController, 
  updateUserProfileController, 
  deleteUserController,
  updateUserRoleController // Asegúrate de importar el controlador correcto
} from '../controllers/userController';
import logger from '../utils/logger';

const router = express.Router();

// Ruta para obtener el perfil del usuario autenticado
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id?.toString();

    if (!userId) {
      logger.warn('Usuario no autenticado');
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    const user = await getUserProfile(userId);

    if (!user) {
      logger.warn(`Usuario no encontrado con ID: ${userId}`);
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    logger.error('Error al obtener perfil del usuario', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para obtener la lista de usuarios (sólo para administradores)
router.get('/admin/users', authMiddleware, getAllUsersController);

// Ruta para actualizar el perfil del usuario
router.put('/profile', authMiddleware, updateUserProfileController);

// Ruta para actualizar el rol de un usuario (solo administradores)
router.put('/:id/role', authMiddleware, updateUserRoleController);

// Ruta para eliminar usuario (sólo administradores)
router.delete('/:id', authMiddleware, deleteUserController);

export default router;
