import React, { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import Recommendation from './components/Recommendation';
import {
  useQuery, useMutation, useSubscription, useApolloClient
} from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifStatus, setNotifStatus] = useState('');
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if ( token ) setToken(token);
  }, []);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map((b) => b.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      });
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      // console.log(subscriptionData);
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added`, 'success');
      updateCacheWith(addedBook);
    }
  });

  const notify = (message, status) => {
    setNotifMessage(message);
    setNotifStatus(status);
    setTimeout(() => {
      setNotifMessage(null);
    }, 10000);
  }

  const logout = () => {
    setToken(null);
    localStorage.removeItem('library-user-token');
    client.resetStore();
  }

  return (
    <div>
      <Notify 
        notifMessage={notifMessage}
        notifStatus={notifStatus} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendation')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setNotif={notify}
      />

      <Recommendation 
        show={page === 'recommendation'}
      />

      {token ? null : (
        <LoginForm
          show={page === 'login'}
          setToken={setToken} 
          setNotif={notify}
          next={() => setPage('authors')}
        />
      )}
    </div>
  )
}



export default App