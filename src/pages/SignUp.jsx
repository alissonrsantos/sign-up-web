/* eslint-disable react/prop-types */
import React from 'react';
import NavBar from '../components/NavBar';
import Form from '../components/Form';

export default function SignUp(
  {
    name,
    setName,
    image,
    setImage,
    birthDate,
    setBirthDate,
    users,
    setUsers,
    preview,
    setPreview,
  },
) {
  return (
    <>
      <NavBar />
      <Form
        name={name}
        setName={setName}
        image={image}
        setImage={setImage}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        users={users}
        setUsers={setUsers}
        preview={preview}
        setPreview={setPreview}
      />
    </>
  );
}
