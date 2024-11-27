import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        const response = await axios.get('http://localhost:3000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
        setFormData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.mensaje || 'Error al cargar el perfil');
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:3000/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data.usuario);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al actualizar el perfil');
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <p><strong>Nombre:</strong> {profile.nombre}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
