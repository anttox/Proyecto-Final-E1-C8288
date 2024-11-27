import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { 
  createResourceController, 
  getAllResourcesController, 
  updateResourceController,
  deleteResourceController 
} from '../controllers/resourceController';

const router = express.Router();

// Ruta para crear un recurso
router.post('/', authMiddleware, createResourceController);

// Ruta para obtener todos los recursos
router.get('/', authMiddleware, getAllResourcesController);

// Ruta para actualizar un recurso
router.put('/:id', authMiddleware, updateResourceController);

// Ruta para eliminar un recurso
router.delete('/:id', authMiddleware, deleteResourceController);

export default router;
