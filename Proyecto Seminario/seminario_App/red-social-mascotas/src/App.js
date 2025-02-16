import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Mascotas from './components/Mascotas';
import Publicaciones from './components/Publicaciones';
import Comentarios from './components/Comentarios';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Mascotas />} />
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/publicaciones" element={<Publicaciones />} />
          <Route path="/comentarios" element={<Comentarios />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App