import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditResourceForm from './EditResourceForm';

interface Resource {
  id_recurso: number;
  tipo_recurso: string;
  configuracion: string;
  estado: string;
}

interface ResourceListProps {
  searchQuery: string;
  filterStatus: string;
}

const ResourceList: React.FC<ResourceListProps> = ({ searchQuery, filterStatus }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/resources', {
          headers: { Authorization: `Bearer ${token}` },
          params: { tipo: searchQuery, estado: filterStatus },
        });
        setResources(response.data);
      } catch (error: any) {
        alert('Error al obtener recursos.');
      }
    };

    fetchResources();
  }, [searchQuery, filterStatus]);

  const deleteResource = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources((prevResources) => prevResources.filter((res) => res.id_recurso !== id));
      alert('Recurso eliminado correctamente.');
    } catch (error: any) {
      alert('Error al eliminar recurso.');
    }
  };

  return (
    <div>
      {editingResource ? (
        <EditResourceForm
          resource={editingResource}
          onUpdate={() => {
            setEditingResource(null);
            alert('Recurso actualizado.');
          }}
        />
      ) : (
        <ul className="space-y-2">
          {resources.map((resource) => (
            <li key={resource.id_recurso} className="border rounded p-4">
              <p><strong>Tipo:</strong> {resource.tipo_recurso}</p>
              <p><strong>Configuración:</strong> {resource.configuracion}</p>
              <p><strong>Estado:</strong> {resource.estado}</p>
              <button onClick={() => deleteResource(resource.id_recurso)}>Eliminar</button>
              <button onClick={() => setEditingResource(resource)}>Editar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourceList;
