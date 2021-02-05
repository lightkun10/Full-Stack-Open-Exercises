const { ApolloServer, gql } = require('apollo-server');
const { v1: uuid } = require('uuid');

let findAuthorWritten = (authorName) => {
  let count = 0;
  books.forEach((book) => book.author === authorName ? count++ : "" );
  return count;
}

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring'],
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design'],
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring'],
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns'],
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design'],
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime'],
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution'],
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) return books;

      else if (args.author && !args.genre) {
        return books.filter((book) =>
          book.author === args.author
        );
      }

      else if (!args.author && args.genre) {
        return books.filter((book) =>
          book.genres.includes(args.genre)
        );
      }

      else {
        return books.filter((book) =>
          book.author === args.author && book.genres.includes(args.genre)
        );
      }
    },
    allAuthors: () => {
      const result = [];
      
      authors.map((author) => {
        let query = {};
        query.name = author.name;
        query.bookCount = findAuthorWritten(author.name);
        result.push(query);
      });
      return result;
    }
  },

  Mutation: {
    addBook: (root, args) => {
      if (authors.filter((author) => author.name === args.author).length > 0) {
        const book = { ...args, id: uuid() };
        books = books.concat(book);
        return book;
      } else {
        const author = { name: args.author, 
          born: null, bookCount: 1, id: uuid() };
        authors = authors.concat(author);
        const book = { ...args, id: uuid() };
        books = books.concat(book);
        console.log(books);
        return book;
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})