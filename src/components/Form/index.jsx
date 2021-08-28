/* eslint-disable no-lonely-if */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './style.scss';

export default function Form(
  {
    name,
    setName,
    image,
    setImage,
    newImage,
    setNewImage,
    birthDate,
    setBirthDate,
    users,
    setUsers,
    preview,
    setPreview,
    newPreview,
    setNewPreview,
    id,
  },
) {
  const [nameUpdated, setNameUpdated] = useState('');
  const [imageUpdated, setImageUpdated] = useState('');
  const [birthDateUpdated, setBirthDateUpdated] = useState('');

  const history = useHistory();

  if (id) {
    useEffect(() => {
      async function getUserById() {
        const response = await api.get(`/user/${id}`);
        const [upUser] = response.data;

        setNameUpdated(upUser.name);
        setImageUpdated(response.data.image);
        setBirthDateUpdated(response.data.birthDate);
      }

      getUserById();
    }, [id]);
  }

  if (!id) {
    useEffect(() => {
      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setImage(null);
      }
    }, [image]);
  }

  if (id) {
    useEffect(() => {
      if (newImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewPreview(reader.result);
        };
        reader.readAsDataURL(newImage);
      } else {
        setNewImage(null);
      }
    }, [newImage]);
  }

  const fileInputRef = useRef();

  async function handleCreateUser(event) {
    event.preventDefault();

    const user = {
      name,
      birthDate,
      image: URL.createObjectURL(image),
    };

    users.push(user);
    setUsers(users);

    const response = await api.post('/users', user);

    if (response.status === 200) {
      alert('Usuário cadastrado com sucesso!');
    } else {
      alert('Erro ao cadastrar usuário!');
    }

    history.push('/users');

    return response;
  }

  async function handleUpdateUser(event) {
    event.preventDefault();

    const response = await api.put('/users', {
      id,
      name: nameUpdated,
      image: imageUpdated,
      birthDate: birthDateUpdated,
    });

    if (response.status === 200) {
      alert('Usuário atualizado com sucesso!');
    } else {
      alert('Erro ao atualizar usuário!');
    }

    history.push('/users');

    return response;
  }

  function addImage() {
    fileInputRef.current.click();
  }

  return (
    <div className="sign-up">
      <h2>{id ? 'Editar Usuário' : 'Cadastrar Usuário'}</h2>
      {image ? <img src={preview} alt={name} /> : <img src={newPreview} alt={name} />}
      <form method="POST">
        <button type="button" onClick={addImage}>
          Selecionar Imagem
          <input
            type="file"
            id="selected-image"
            name="image"
            ref={fileInputRef}
            accept="image/*"
            defaultValue={id ? imageUpdated : ''}
            onChange={(event) => {
              if (!id) {
                const file = event.target.files[0];
                if (file && file.type.substr(0, 5) === 'image') {
                  setImage(file);
                } else {
                  setImage(null);
                }
              } else {
                const file = event.target.files[0];
                if (file && file.type.substr(0, 5) === 'image') {
                  setNewImage(file);
                } else {
                  setNewImage(null);
                }
              }
            }}
          />
        </button>
        <strong>Nome</strong>
        <input
          type="text"
          name="name"
          onChange={(event) => {
            if (!id) {
              setName(event.target.value);
            } else {
              setNameUpdated(event.target.value);
            }
          }}
          placeholder="Digite seu nome"
          defaultValue={id ? nameUpdated : ''}
        />
        <strong>Data de Nascimento</strong>
        <input
          type="date"
          onChange={(event) => {
            if (!id) {
              setBirthDate(event.target.value);
            } else {
              setBirthDateUpdated(event.target.value);
            }
          }}
          placeholder="Data de Nascimento"
          defaultValue={id ? birthDateUpdated : ''}
        />
        <button type="submit" onClick={id ? handleUpdateUser : handleCreateUser}>{id ? 'Atualizar' : 'Enviar'}</button>
      </form>
    </div>
  );
}
