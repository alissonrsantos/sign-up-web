import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import './styles/global.scss';

export default function App() {
  const [users, setUsers] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignUp}>
            <SignUp users={users} setUsers={setUsers} />
          </Route>
          <Route path="/users" component={Users}>
            <Users />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
