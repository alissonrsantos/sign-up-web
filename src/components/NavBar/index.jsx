import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default function NavBar() {
  return (
    <header>
      <div className="container-navbar">
        <h4>Cadastro de Usuários</h4>
        <nav>
          <ul>
            <li>
              <Link to="/">Cadastrar Usuário</Link>
            </li>
            <li>
              <Link to="/users">Usuários</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
