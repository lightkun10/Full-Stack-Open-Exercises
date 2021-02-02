import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"

const sortByLikes = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch(); // ! DELETE/MOVE LATER
  const user = useSelector(state => state.user);
  const [users, ] = useUsers('http://localhost:3003/api/users');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortByLikes(blogs))
    );
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user));
    }
  }, [dispatch])

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
      const blog = await blogService.createBlog({
        title, author, url,
      })
      dispatch(
        setNotification(
          `a new blog ${blog.title} by ${blog.author} added`, 'success', 5)
      );

      // Update state of App component
      setBlogs(sortByLikes(blogs.concat(blog)))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification(`${exception}`, 'error', 5)); //! WATCH
    }
  }

  const handleLike = async (blog) => {
    const blogId = blog.id
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    try {
      const updated = await blogService.updateBlog(blogId, updatedBlog)
      // Update state of App component
      setBlogs(sortByLikes(blogs.map((blog) => blog.id !== blogId ? blog : updated)))
    } catch(exception) {
      console.log(exception)
      dispatch(setNotification(`${exception}`, 'error', 5)); //! WATCH
    }
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }
    const id = blog.id

    try {
      await blogService.deleteBlog(id)
      dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`, 'success', 5)); //! WATCH
      
      // Update state of App component
      setBlogs(sortByLikes(blogs.filter((blog) => blog.id !== id)))
    } catch (exception) {
      console.log(exception)
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

  console.log(users);
  // console.log(blogs);

  return (
    <Router>
      <div id="maincontent">
        <div className="header">
          <h2>blogs</h2>

          <Notification />

          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>

        <Switch>
          <Route path="/users">
            {users.map((user) => 
              <div key={user.id}>
                {user.name} --- {user.blogs.length}
              </div>
            )}
          </Route>

          <Route path="/">
            {addBlogForm()}
            {blogs.map((blog) =>
              <Blog
                key={blog.id}
                blog={blog}
                addLike={() => handleLike(blog)}
                onDelete={
                  blog.user && blog.user.username === user.username ?
                    () => handleDelete(blog) :
                    null
                }
              />
            )}
            
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
                    <td>{user.name}</td>
                    <td>{user.blogs.length}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;