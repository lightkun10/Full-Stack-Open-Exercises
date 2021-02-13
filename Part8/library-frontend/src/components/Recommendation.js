import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { CURRENT_USER, BOOKS_BY_GENRE } from '../queries';

const Recommendation = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const currentUser = useQuery(CURRENT_USER);
  const [ booksByGenre, result ] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    if (currentUser.data) {
      const genre = currentUser.data.me.favoriteGenre;
      setFavoriteGenre(genre);
      booksByGenre({ variables: { genre } })
    }
  }, [currentUser.data, booksByGenre]);

  if (!props.show) return null;

  if (currentUser.loading) return <div>loading...</div>

  // console.log(result);

  const books = result ? result.data.allBooks : [];

  return (
    <div>
      <h2>recommendation</h2>

      <div>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </div>

      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {books.map((book) => 
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommendation;