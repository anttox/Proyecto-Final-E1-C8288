import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        contraseña: '',
        rol: 'Operador',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('http://localhost:3000/api/auth/register', formData);
            alert('Usuario registrado correctamente');
            window.location.href = '/login';
        } catch (error: any) {
            setError('Error al registrar usuario. Revisa los datos e intenta nuevamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registro</h1>
            <input
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={formData.contraseña}
                onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                required
            />
            <select
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
            >
                <option value="Operador">Operador</option>
                <option value="Administrador">Administrador</option>
            </select>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;
