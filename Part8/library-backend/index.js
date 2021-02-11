const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "thehashslinginslasher";
const STATIC_PASSWORD = "secret";
const MONGODB_URI = "mongodb+srv://fullstack:2dNnLMji1haISUAV@cluster0.fsm0d.mongodb.net/librarygraphql?retryWrites=true";

console.log("Connecting to", MONGODB_URI);

mongoose.connect(
  MONGODB_URI, { 
    useNewUrlParser: true, useUnifiedTopology: true, 
    useFindAndModify: false, useCreateIndex: true }
).then(() => {
  console.log("connected to MongoDB")
}).catch((error) => {
  console.log("error connection to MongoDB:", error.message);
});

// let findAuthorWritten = (authorName) => {
//   let count = 0;
//   books.forEach((book) => book.author === authorName ? count++ : "" );
//   return count;
// }

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
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
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];

        query.author = author._id;
      }

      if (args.genre) query.genre = { $in: [author._id] };
      
      return Book.find(query).populate('author');
    },
    allAuthors: async (root, args) => {
      const countAuthor = await Book.aggregate([
          { $group: { _id: '$author', count: { $sum: 1 } } }
      ]).allowDiskUse(true);
      // console.log(countAuthor);

      const countMap = new Map(countAuthor.map((author) => 
        [author._id.toString(), author.count]
      ));

      let authors = await Author.find({});

      for (let i = 0; i < authors.length; i++) {
        authors[i].bookCount = countMap.get(authors[i]._id.toString()) || 0;
      }

      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (!args.title) {
        throw new UserInputError('title must be specified or too short', {
          invalidArgs: args.title,
        });
      }

      if (args.published <= 0) {
        throw new UserInputError('published year must be specified', {
          invalidArgs: args.published,
        });
      }

      if (!args.author) {
        throw new UserInputError('author name must specified', {
          invalidArgs: args.author,
        });
      }

      // console.log(args.genres.length);
      if (args.genres.length <= 0) {
        throw new UserInputError('at least one genre name must specified', {
          invalidArgs: args.genres,
        });
      }

      let author = await Author.findOne({ name: args.author });

      try {
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
        let book = new Book({ ...args, author: author._id });
        await book.save();
        return book;
      } catch(e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },

    // For now limited to only edit the born year
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name:  args.name});
      if (!author) return null;

      try {
        author.born = args.setBornTo;
        await author.save()
      } catch(e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
      return author;
    },

    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if ( !user || args.password !== STATIC_PASSWORD ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }; // token
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id).populate('friends');
      return { currentUser };
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})