import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (notification.message && notification.notifType === 'error') {
    return (
      <div className='error'>
        {notification.message}
      </div>
    )
  } else if (notification.message && notification.notifType === 'success') {
    return (
      <div className='success'>
        {notification.message}
      </div>
    )
  }
  return ''
}

export default Notification;