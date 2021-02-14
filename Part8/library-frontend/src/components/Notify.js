import React from 'react';

const Notify = (props) => {
  console.log(props.notifStatus);

  if (props.notifStatus === 'success') {
    return (
      <div style={{color: 'green'}}>
        {props.notifMessage}
      </div>
    )
  };

  if (props.notifStatus === 'error') {
    return (
      <div style={{color: 'red'}}>
        {props.notifMessage}
      </div>
    )
  }
  
  return null;
}

export default Notify;