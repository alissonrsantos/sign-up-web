import React, { useState } from 'react';
import axios from 'axios';
import profileDefaultImg from '../../assets/profile-default.jpg';
import './style.scss';

// eslint-disable-next-line react/prop-types
export default function Form({ users, setUsers }) {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  function handleSubmit() {
    axios.post('http://localhost:3333/users', { name, birthDate, image: image.name });

    setUsers([
      ...users,
      { name, birthDate, image: image.name },
    ]);
  }

  return (
    <div className="sign-up">
      <h2>Preencha o formulário com os dados abaixo:</h2>
      { image ? <img src={URL.createObjectURL(image)} alt="Imagem de perfil padrão" /> : <img src={profileDefaultImg} alt="Imagem de perfil padrão" /> }
      <form method="POST">
        <label htmlFor="selected-image">
          Selecionar Imagem
          <input
            type="file"
            id="selected-image"
            name="image"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </label>
        <strong>Nome</strong>
        <input
          type="text"
          onChange={(event) => setName(event.target.value)}
          placeholder="Digite seu nome"
        />
        <strong>Data de Nascimento</strong>
        <input
          type="date"
          onChange={(event) => setBirthDate(event.target.value)}
          placeholder="Digite seu nome"
        />
        <button type="submit" onClick={handleSubmit}>Enviar</button>
      </form>
    </div>
  );
}
