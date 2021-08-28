/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar/index';
import Form from '../components/Form/index';
import '../components/Form/style.scss';

export default function EditUser(
  {
    newPreview,
    setNewPreview,
    newImage,
    setNewImage,
  },
) {
  const { id } = useParams();

  return (
    <>
      <NavBar />
      <Form
        id={id}
        newImage={newImage}
        setNewImage={setNewImage}
        newPreview={newPreview}
        setNewPreview={setNewPreview}
      />
    </>
  );
}
