import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  // const style = {
  //   border: 'solid',
  //   padding: 10,
  //   borderWidth: 1
  // }

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