import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.setNotif(error.graphQLErrors[0].message, 'error')
    }
  });

  // console.log(result.data);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem('library-user-token', token);
      props.next();
    }
  }, [props, result.data]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  }

  if (!props.show) return null;

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input 
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input 
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm;