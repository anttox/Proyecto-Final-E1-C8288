import jwt from 'jsonwebtoken';

// Generar un token JWT
export const generateToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

// Verificar un token JWT
export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!);
};
