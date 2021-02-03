import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (notification.message && notification.notifType === 'error') {
    return (
      <Alert severity='error'>
        {notification.message}
      </Alert>
    )
  } else if (notification.message && notification.notifType === 'success') {
    return (
      <Alert severity="success">
        {notification.message}
      </Alert>
    )
  }
  return ''
}

export default Notification;