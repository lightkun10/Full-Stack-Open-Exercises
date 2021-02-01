import React from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const loginForm = () => {

  return (
    <div>
      <h2>Log in to application</h2>

      {/* <Notification /> */}

      <form className="login__form" onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="login__form__submit" 
          type="submit">login
        </button>
      </form>
    </div>
  )
}

export default loginForm;