import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Red Social Mascotas
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/mascotas">
                Mascotas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/publicaciones">
                Publicaciones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/comentarios">
                Comentarios
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;