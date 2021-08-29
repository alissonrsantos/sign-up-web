/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './style.scss';

export default function Card({ usersSignUp }) {
  const history = useHistory();

  async function routerRedirect(id) {
    history.push(`/edit/${id}`);
  }

  console.log(usersSignUp);

  async function handleDelete(userId) {
    window.confirm('Tem certeza que deseja excluir?');

    const destroy = api.delete(`/user/${userId}`);

    window.location.reload();

    return destroy;
  }

  return (
    <div className="container-card">
      {usersSignUp.map((user) => (
        <div className="card" key={user.id}>
          <img src={user.image} alt={user.name} />
          <p>
            <strong>
              Nome:
            </strong>
            {user.name}
          </p>
          <p>
            <strong>
              Data de Nascimento:
            </strong>
            {user.birthDate.slice(0, 10)}
          </p>
          <div className="buttons">
            <button
              type="button"
              onClick={() => { routerRedirect(user.id); }}
              className="edit"
            >
              Editar
            </button>
            <button
              type="button"
              className="delete"
              onClick={() => { handleDelete(user.id); }}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
