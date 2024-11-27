import React, { useState } from 'react';
import axios from 'axios';

const ResourceForm = () => {
  const [formData, setFormData] = useState({
    tipo: '',
    configuracion: '',
    estado: 'Activo',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Error: No se encontró un token. Inicia sesión primero.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/api/resources',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Recurso creado correctamente.');
      setFormData({ tipo: '', configuracion: '', estado: 'Activo' }); // Resetea el formulario después de enviarlo
    } catch (error: any) {
      alert(`Error al crear recurso: ${error.response?.data?.mensaje || 'Error desconocido'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Tipo de recurso"
        value={formData.tipo}
        onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
        className="border rounded px-2 py-1 w-full"
        required
      />
      <textarea
        placeholder="Configuración del recurso"
        value={formData.configuracion}
        onChange={(e) => setFormData({ ...formData, configuracion: e.target.value })}
        className="border rounded px-2 py-1 w-full"
        required
      ></textarea>
      <select
        value={formData.estado}
        onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
        className="border rounded px-2 py-1 w-full"
        required
      >
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear Recurso
      </button>
    </form>
  );
};

export default ResourceForm;
