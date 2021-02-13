import React from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER, ALL_BOOKS } from '../queries';

const Recommendation = (props) => {
  const currentUserFetch = useQuery(CURRENT_USER);
  const booksFetch = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  });

  if (currentUserFetch.loading && booksFetch.loading) 
    return <div>loading...</div>

  if (!props.show) return null;
    
  const favGenre = currentUserFetch.data.me.favoriteGenre;
  const books = booksFetch.data.allBooks;
  // console.log(books);

  return (
    <div>
      <h2>recommendation</h2>

      <div>
        books in your favorite genre <strong>{favGenre}</strong>
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
            {books.filter((book) =>
              book.genres
                .includes(favGenre))
                .map((book) => (
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recommendation;