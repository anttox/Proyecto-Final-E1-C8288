import React, { useState } from 'react';
import ResourceForm from '../components/Resources/ResourceForm';
import ResourceList from '../components/Resources/ResourceList';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Panel de Control</h1>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar recursos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="">Todos</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      <ResourceForm />
      <ResourceList searchQuery={searchQuery} filterStatus={filterStatus} />
    </div>
  );
};

export default Dashboard;
