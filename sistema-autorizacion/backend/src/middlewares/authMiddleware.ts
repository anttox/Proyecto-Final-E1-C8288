import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  id: number;
  rol: string;
}

interface CustomRequest extends Request {
  user?: DecodedToken;
  clientIp?: string;
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.user = decoded;

    // Capturar la IP de origen
    req.clientIp = req.header('x-forwarded-for') || req.socket.remoteAddress || 'IP no disponible';

    // Debugging
    console.log('Token decodificado:', req.user);
    console.log('IP del cliente:', req.clientIp);

    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token inválido.' });
  }
};

export default authMiddleware;
