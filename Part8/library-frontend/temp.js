return (
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
                    {/* <td>{book.author.name}</td> */}
                    <td>{book.published}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
)