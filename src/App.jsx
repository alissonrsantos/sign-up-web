import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EditUser from './pages/EditUser';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import './styles/global.scss';

export default function App() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [preview, setPreview] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newPreview, setNewPreview] = useState('');
  const [users, setUsers] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignUp}>
            <SignUp
              image={image}
              setImage={setImage}
              name={name}
              setName={setName}
              users={users}
              setUsers={setUsers}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
              preview={preview}
              setPreview={setPreview}
            />
          </Route>
          <Route exact path="/users" component={Users}>
            <Users />
          </Route>
          <Route path="/edit/:id" component={EditUser}>
            <EditUser
              newPreview={newPreview}
              setNewPreview={setNewPreview}
              newImage={newImage}
              setNewImage={setNewImage}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
