import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUser = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró un token. Por favor, inicia sesión.');
        return;
      }

      const userRole = JSON.parse(atob(token.split('.')[1])).rol;
      if (userRole !== 'Administrador') {
        setError('Acceso denegado. Solo los administradores pueden gestionar usuarios.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/users/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error: any) {
        setError('Error al obtener usuarios.');
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (id: string, newRole: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:3000/api/users/${id}`,
        { rol: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Rol actualizado correctamente.');
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id_usuario === id ? { ...user, rol: newRole } : user
        )
      );
    } catch (error: any) {
      alert('Error al actualizar rol.');
    }
  };

  const deleteUser = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Usuario eliminado correctamente.');
      setUsers((prevUsers) => prevUsers.filter((user) => user.id_usuario !== id));
    } catch (error: any) {
      alert('Error al eliminar usuario.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id_usuario} className="border rounded p-4">
            <p>{user.nombre} - {user.email}</p>
            <p><strong>Rol:</strong> {user.rol}</p>
            <select
              value={user.rol}
              onChange={(e) => updateUserRole(user.id_usuario, e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="Operador">Operador</option>
              <option value="Administrador">Administrador</option>
            </select>
            <button
              onClick={() => deleteUser(user.id_usuario)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUser;
