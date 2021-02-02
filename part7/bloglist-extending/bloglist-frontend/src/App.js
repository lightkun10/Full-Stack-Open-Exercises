import React, { useEffect } from 'react';
import Blogs from './components/Blogs';
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

const sortByLikes = (blogs) => blogs.sort((a, b) => b.likes - a.likes);

const Users = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) =>
          <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const User = ({ user }) => {
  if (!user) return <div>Please wait...</div>;

  return (
    <div className="user__profile">
      <div className="user__profil_name">
        <h2>{user.name}</h2>
      </div>
      <div className="user__profile_blogs">
        <div className="user__profile_blogs_header">
          <strong>added blogs</strong>
        </div>
        <div className="user__profile_blogs_list">
          <ul>
            {user.blogs.map((blog) => {
              return (
                <li key={blog.id}>
                  {blog.title}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

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
      console.log(exception)
      dispatch(setNotification(`${exception}`, 'error', 5));
    }
  }

  const handleLike = async (blog) => {
    const blogId = blog.id;
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    try {
      dispatch(toggleLike(blogId, updatedBlog));
    } catch(exception) {
      console.log(exception)
      dispatch(setNotification(`${exception}`, 'error', 5));
    }
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

  const padding = { padding: 5};

  return (
    <div id="maincontent">
      <div className="header">
        <div className="links">
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          {`${user.name}`} logged in <button onClick={handleLogout}>logout</button>
        </div>

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
                null
            }
            />
        </Route>

        <Route path="/">
          {addBlogForm()}
          {blogs.map((blog) =>
            <Blogs
              key={blog.id}
              blog={blog}
            />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App;