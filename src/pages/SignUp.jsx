/* eslint-disable react/prop-types */
import React from 'react';
import NavBar from '../components/NavBar';
import Form from '../components/Form';

export default function SignUp({ users, setUsers }) {
  return (
    <>
      <NavBar />
      <Form users={users} setUsers={setUsers} />
    </>
  );
}
