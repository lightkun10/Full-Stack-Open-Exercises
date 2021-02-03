import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Notification from '../components/Notification';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    props.onLogin({
      username, password
    }, () => {
      setUsername('');
    });
    setPassword('');
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <Notification />

      <form className="login__form" onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          variant="contained" color="primary"
          className="login__form__submit" 
          type="submit">
            login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm;