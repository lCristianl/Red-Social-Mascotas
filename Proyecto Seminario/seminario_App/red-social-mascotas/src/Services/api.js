import axios from 'axios';

const api_url = 'http://localhost:8000/api';

export const getMascotas = () => axios.get(`${api_url}/mascotas/`);
export const createMascota = (data) => axios.post(`${api_url}/mascotas/`, data);

// Publicaciones
export const getPublicaciones = () => axios.get(`${api_url}/publicaciones/`);
export const createPublicacion = (data) => axios.post(`${api_url}/publicaciones/`, data);

// Comentarios
export const getComentarios = () => axios.get(`${api_url}/comentarios/`);
export const createComentario = (data) => axios.post(`${api_url}/comentarios/`, data);