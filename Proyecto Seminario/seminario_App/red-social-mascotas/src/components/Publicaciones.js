import React, { useState, useEffect } from 'react';
import { getPublicaciones, createPublicacion } from '../Services/api';
import Comentarios from './Comentarios'; // Importa el componente Comentarios

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [nuevaPublicacion, setNuevaPublicacion] = useState({
    titulo: '',
    descripcion: '',
    mascota: 1, // ID de la mascota asociada (ajusta según tu lógica)
  });

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const fetchPublicaciones = async () => {
    try {
      const response = await getPublicaciones();
      setPublicaciones(response.data);
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  };

  const handleAgregarPublicacion = async () => {
    try {
      const response = await createPublicacion(nuevaPublicacion);
      setPublicaciones([...publicaciones, response.data]);
      setNuevaPublicacion({ titulo: '', descripcion: '' });
    } catch (error) {
      console.error('Error al agregar publicación:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lista de Publicaciones</h1>
      <div className="row">
        {publicaciones.map((publicacion) => (
          <div key={publicacion.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{publicacion.titulo}</h5>
                <p className="card-text">{publicacion.descripcion}</p>

                {/* Componente de Comentarios */}
                <Comentarios publicacionId={publicacion.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-5">Agregar Publicación</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={nuevaPublicacion.titulo}
            onChange={(e) =>
              setNuevaPublicacion({ ...nuevaPublicacion, titulo: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={nuevaPublicacion.descripcion}
            onChange={(e) =>
              setNuevaPublicacion({ ...nuevaPublicacion, descripcion: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAgregarPublicacion}
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default Publicaciones;