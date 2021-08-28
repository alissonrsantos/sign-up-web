/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Card from '../components/Card';
import NavBar from '../components/NavBar';

export default function Users() {
  const [usersSignUp, setUsersSignUp] = useState([]);

  useEffect(() => {
    api.get('/users').then((response) => setUsersSignUp(response.data));
  }, []);

  return (
    <>
      <NavBar />
      <Card
        usersSignUp={usersSignUp}
        setUsersSignUp={setUsersSignUp}
      />
    </>
  );
}
