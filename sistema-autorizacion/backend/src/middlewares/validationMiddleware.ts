import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Middleware para validar datos de entrada
export const validateSchema = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ mensaje: error.message });
        }

        next(); // Si no hay errores, continuar
    };
};
