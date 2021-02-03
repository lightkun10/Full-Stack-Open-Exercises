import React, { useEffect } from 'react';
import Blogs from './components/Blogs';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import AddBlogForm from './components/AddBlogForm'
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import { setNotification } from './reducers/notificationReducer';
import { setUser } from './reducers/userReducer';
import { useUsers } from './hooks/index';
import {
  Switch, Route, //useParams,
  useRouteMatch,
  Link, useHistory
} from "react-router-dom"
import { createBlog, deleteBlog, initializeBlogs, toggleLike } from './reducers/blogReducer';
import Container from '@material-ui/core/Container';
import { Paper, TableBody, TableContainer, 
  Table, TableRow, TableCell, AppBar, Button, Toolbar } from '@material-ui/core';

const sortByLikes = (blogs) => blogs.sort((a, b) => b.likes - a.likes);

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const blogs = useSelector(state => sortByLikes(state.blogs));
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [users, ] = useUsers('http://localhost:3003/api/users');

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const history = useHistory();

  const uMatch = useRouteMatch('/users/:id');
  const userMatch = uMatch
    ? users.find((user) => user.id === uMatch.params.id)
    : null;

  const bMatch = useRouteMatch('/blogs/:id');
  const blogMatch = bMatch
    ? blogs.find((blog) => blog.id === bMatch.params.id)
    : null;

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );

      // console.log(user);
      blogService.setToken(user.token)
      dispatch(setNotification(`Successfully logged in as ${user.name}`, 'success', 5));
      dispatch(setUser(user));
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error', 5));
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    blogService.setToken(null);
    dispatch(setUser(null));
  }

  const handleAddBlog = async ({ title, author, url }) => {
    try {
      dispatch(createBlog({ title, author, url }));

      dispatch(
        setNotification(
          `a new blog ${title} by ${author} added`, 'success', 5)
      );
    } catch (exception) {
      // console.log(exception)
      dispatch(setNotification(`${exception}`, 'error', 5));
    }
  }

  const handleLike = async (blog) => {
    const blogId = blog.id;
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    try {
      dispatch(toggleLike(blogId, updatedBlog));
    } catch(exception) {
      console.log(exception)
      dispatch(setNotification(`${exception}`, 'error', 5));
    }
  }

  const handleComment = async (blog, comment) => {
    const blogId = blog.id;
    console.log(comment);
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }

    const id = blog.id;
    try {
      dispatch(deleteBlog(id));
      dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`, 'success', 5));
      history.push('/');
    } catch (exception) {
      console.log(exception);
    }
  }

  const addBlogForm = () => (
    <Togglable buttonLabel="new blog">
      <AddBlogForm createBlog={handleAddBlog} />
    </Togglable>
  )

  // If user is not logged in
  if (user === null) {
    return (
      <LoginForm onLogin={handleLogin} />
    )
  }

  // console.log(users);
  // console.log(blogs);
  // console.log(user);

  const padding = { 
    padding: 5,
    paddingLeft: 30
  };

  return (
    <Container>
      <div className="header">
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            
            <span style={ padding }>
              {`${user.name}`} logged in 
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </span>
          </Toolbar>
        </AppBar>

        <h1>blog app</h1>

        <Notification />
      </div>

      <Switch>
        <Route path="/users/:id">
          <User user={userMatch} />
        </Route>

        <Route path="/users">
          <Users users={users} />
        </Route>

        <Route path="/blogs/:id">
          <Blog 
            blog={blogMatch}
            addLike={() => handleLike(blogMatch)}
            onDelete={
              blogMatch && blogMatch.user.username === user.username ?
                () => handleDelete(blogMatch) :
                null } 
          />
        </Route>

        <Route path="/">
          {addBlogForm()}
          <br></br>
          <Blogs blogs={blogs} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App;