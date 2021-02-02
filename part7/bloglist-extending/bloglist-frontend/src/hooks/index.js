import axios from 'axios';
import { useState, useEffect } from 'react';

export const useUsers = (url) => {
  const [users, setUsers] = useState([]);

  // Get all user
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        // console.log(res);
        setUsers(res.data);
      }).catch((e) => {
        console.log(e);
      })
  }, [url])

  return [
    users, ''
  ]
}

