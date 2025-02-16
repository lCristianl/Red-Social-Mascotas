import React, { useState, useEffect } from 'react';
import { getMascotas, createMascota } from '../Services/api';
import './Mascotas.css';

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [nuevaMascota, setNuevaMascota] = useState({
    nombre: '',
    tipo: 'PERRO', // Valor predeterminado
    edad: '',
    descripcion: '',
    dueño: 1, // ID del usuario autenticado (ajusta según tu lógica de autenticación)
  });

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const response = await getMascotas();
      setMascotas(response.data);
    } catch (error) {
      console.error('Error al obtener las mascotas:', error);
    }
  };

  const handleAgregarMascota = async () => {
    try {
      const response = await createMascota(nuevaMascota);
      setMascotas([...mascotas, response.data]);
      setNuevaMascota({ nombre: '', tipo: 'PERRO', edad: '', descripcion: '' });
    } catch (error) {
      console.error('Error al agregar mascota:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lista de Mascotas</h1>
      <div className="row">
        {mascotas.map((mascota) => (
          <div key={mascota.id} className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{mascota.nombre}</h5>
                <p className="card-text">Tipo: {mascota.tipo}</p>
                <p className="card-text">Edad: {mascota.edad}</p>
                <p className="card-text">Descripción: {mascota.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-5">Agregar Mascota</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nuevaMascota.nombre}
            onChange={(e) => setNuevaMascota({ ...nuevaMascota, nombre: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select
            className="form-select"
            value={nuevaMascota.tipo}
            onChange={(e) => setNuevaMascota({ ...nuevaMascota, tipo: e.target.value })}
            required
          >
            <option value="PERRO">Perro</option>
            <option value="GATO">Gato</option>
            <option value="AVE">Ave</option>
            <option value="OTRO">Otro</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Edad</label>
          <input
            type="number"
            className="form-control"
            value={nuevaMascota.edad}
            onChange={(e) => setNuevaMascota({ ...nuevaMascota, edad: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={nuevaMascota.descripcion}
            onChange={(e) => setNuevaMascota({ ...nuevaMascota, descripcion: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleAgregarMascota}>
          Agregar
        </button>
      </form>
    </div>
  );
};

export default Mascotas;