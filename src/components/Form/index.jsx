/* eslint-disable no-lonely-if */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
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
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userBirthDate, setUserBirthDate] = useState('');
  const [userCode, setUserCode] = useState('');
  const [disabled] = useState(true);

  const history = useHistory();

  if (id) {
    useEffect(() => {
      async function getUserById() {
        const response = await api.get(`/user/${id}`);
        const [userData] = response.data;

        setUserCode(userData.id);
        setUserName(userData.name);
        setUserImage(userData.image);
        setUserBirthDate(userData.birthDate);
      }

      getUserById();
    }, [id]);
  }
  console.log(userImage);
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
      name: userName,
      image: userImage,
      birthDate: userBirthDate,
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
      { image ? <img src={preview} alt={name} /> : <img src={newPreview} alt={name} />}
      <form method="POST" encType="multipart/form-data">
        <button type="button" onClick={addImage}>
          Selecionar Imagem
          <input
            type="file"
            id="selected-image"
            name="image"
            ref={fileInputRef}
            accept="image/*"
            defaultValue={id ? userImage : ''}
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
        {id && <strong>Código</strong>}
        {id && <input type="text" defaultValue={userCode} disabled={disabled} />}
        <strong>Nome</strong>
        <input
          type="text"
          name="name"
          onChange={(event) => {
            if (!id) {
              setName(event.target.value);
            } else {
              setUserName(event.target.value);
            }
          }}
          placeholder="Digite seu nome"
          defaultValue={id ? userName : ''}
        />
        <strong>Data de Nascimento</strong>
        <InputMask
          type="text"
          mask="99/99/9999"
          onChange={(event) => {
            if (!id) {
              setBirthDate(event.target.value);
            } else {
              setUserBirthDate(event.target.value);
            }
          }}
          value={id && userBirthDate}
          placeholder="Data de Nascimento"
        />
        <button type="submit" onClick={id ? handleUpdateUser : handleCreateUser}>{id ? 'Atualizar' : 'Enviar'}</button>
      </form>
    </div>
  );
}
