import React, { useState, useEffect } from 'react';
import { getComentarios, createComentario } from '../Services/api';

const Comentarios = ({ publicacionId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({
    contenido: '',
    publicacion: publicacionId, // ID de la publicación asociada
  });

  useEffect(() => {
    fetchComentarios();
  }, []);

  const fetchComentarios = async () => {
    try {
      const response = await getComentarios();
      // Filtra los comentarios para mostrar solo los relacionados con la publicación actual
      const comentariosFiltrados = response.data.filter(
        (comentario) => comentario.publicacion === publicacionId
      );
      setComentarios(comentariosFiltrados);
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
  };

  const handleAgregarComentario = async () => {
    try {
      const response = await createComentario(nuevoComentario);
      setComentarios([...comentarios, response.data]);
      setNuevoComentario({ contenido: '' });
    } catch (error) {
      console.error('Error al agregar comentario:', error.response?.data || error.message);
    }
  };

  return (
    <div className="mt-3">
      <h4>Comentarios</h4>
      <div>
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="mb-2">
            <p>{comentario.contenido}</p>
            <small className="text-muted">
              Por {comentario.usuario} -{' '}
              {new Date(comentario.fecha_creacion).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      <h5 className="mt-3">Agregar Comentario</h5>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label">Contenido</label>
          <textarea
            className="form-control"
            value={nuevoComentario.contenido}
            onChange={(e) =>
              setNuevoComentario({ ...nuevoComentario, contenido: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAgregarComentario}
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default Comentarios;