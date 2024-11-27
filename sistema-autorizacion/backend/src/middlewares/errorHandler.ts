import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).json({
        mensaje: 'Error interno del servidor',
        detalle: err.message,
    });
};

export default errorHandler;
