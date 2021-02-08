import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      author,
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, 
    $published: Int!, $genres: [String!]!) {
      addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
      ) {
        title
        author
        published
        genres
        id
      }
    }
`;

export const EDIT_AUTHOR_BIRTH = gql`
  mutation editAuthor($name: String!, $birth: Int!) {
    editAuthor(name: $name, setBornTo: $birth) {
      name,
      born,
    }
  }
`;