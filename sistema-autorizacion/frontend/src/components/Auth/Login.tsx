import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', contraseña: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            alert('Inicio de sesión exitoso');
            window.location.href = '/dashboard';
        } catch (error: any) {
            setError('Credenciales incorrectas. Intenta nuevamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
            <input
                type="email"
                placeholder="Email"
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default Login;
