import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState('all genres');

  const booksFetch = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  });
  if (booksFetch.loading) return <div>loading...</div>

  // console.log(booksFetch.data);

  if (!props.show) {
    return null
  }

  const displayBooks = () => {
    if (genre === "all genres")  {
      return (
        books.map((book) => (
          <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
        ))
      )
    }

    return (
      books.filter((book) =>
        book.genres.includes(genre))
        .map((book) => (
          <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
      ))
    )
  }

  const books = booksFetch.data.allBooks;
  // console.log(books);

  const genreSet = new Set();
  for (const book of books) {
    for (const genre of book.genres) {
      genreSet.add(genre);
    }
  }
  // console.log(genreSet);
  const genres = Array.from(genreSet);

  return (
    <div>
      <h2>books</h2>
      
      <div className="genre__classified">
        in genre <strong>{genre}</strong>
      </div>
      
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
          {displayBooks()}
        </tbody>
      </table>

      <div className="genrelist">
        {genres.map((genre) => (
          <button onClick={() => setGenre(genre)} key={genre}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books