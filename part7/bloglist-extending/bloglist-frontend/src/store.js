import { createStore, combineReducers, applyMiddleware } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import blogService from './services/blogs';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/userReducer';
import blogReducer, { initializeBlogs } from './reducers/blogReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogs: blogReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

blogService.getAll().then((blogs) => {
  store.dispatch(initializeBlogs(blogs));
});

export default store;