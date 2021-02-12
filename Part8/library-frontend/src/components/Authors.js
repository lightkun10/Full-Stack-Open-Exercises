  
import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import EditAuthorBirth from './EditAuthorBirth';

const Authors = (props) => {
  const authorsFetch = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  });
  if (authorsFetch.loading) return <div>loading...</div>
  
  // console.log(authorsFetch.data.allAuthors);

  if (!props.show) {
    return null
  }

  const authors = authorsFetch.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {props.token ? (
        <EditAuthorBirth authors={authors} />
      ) : null}
    </div>
  )
}

export default Authors
