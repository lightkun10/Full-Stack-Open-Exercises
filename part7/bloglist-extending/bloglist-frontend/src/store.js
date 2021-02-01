import { createStore, combineReducers, applyMiddleware } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import blogService from './services/blogs';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  notification: notificationReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

// blogService.getAll().then((blogs) => {
//   store.dispatch(initializeBlogs(blogs));
// });

export default store;