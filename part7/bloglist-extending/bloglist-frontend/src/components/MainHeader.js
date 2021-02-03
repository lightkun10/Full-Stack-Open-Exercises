import React from 'react';
import { Link } from 'react-router-dom';
import Notification from './Notification';
import { AppBar, Button, Toolbar } from '@material-ui/core';

const MainHeader = ({ user, handleLogout }) => {
  const padding = { 
    padding: 5,
    paddingLeft: 30
  };

  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          
          <span style={ padding }>
            {`${user.name}`} logged in 
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          </span>
        </Toolbar>
      </AppBar>

      <h1>blog app</h1>

      <Notification />
    </div>
  )
}

export default MainHeader;