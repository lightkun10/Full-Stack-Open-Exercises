import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  // console.log('state now: ', state);
  // console.log('action', action.type);

  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'ADD_LIKE':
      const id = action.data.id;
      const toChange = state.find((blog) => blog.id === id);
      const liked = {
        ...toChange, likes: toChange.likes + 1
      }
      return state.map((blog) => 
        blog.id !== id ? blog : liked).sort((a, b) => 
          b.likes - a.likes
      )
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.id);
    case 'ADD_COMMENT':
      const id2 = action.data.id;
      const toAddComment = state.find((blog) => blog.id === id2);
      if (!toAddComment) {
        console.error('blog is not valid');
        return state;
      }
      return state.map((blog) => blog.id !== id2 ? blog : action.data);
    case 'INIT_BLOGS':
      return action.data;
    default:
      return state;
  }
}

/*********************
*?  Action creators 
*********************/
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  }
}

export const createBlog = ({title, author, url}) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog({
      title, author, url,
    });
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  }
}

export const toggleLike = (blogId, blog) => {
  return async dispatch => {
    const updated = await blogService.updateBlog(blogId, blog);
    dispatch({
      type: 'ADD_LIKE',
      data: updated
    });
  }
}

export const addComment = (blog, comment) => {
  // console.log(comment);
  return async dispatch => {
    const blogId = blog.id;
    try {
      const commented = await blogService.addComment(blogId, comment);
      dispatch({
        type: 'ADD_COMMENT',
        data: commented
      })
    } catch(e) {
      console.error(e);
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    blogService.deleteBlog(id);
    dispatch({
      type: 'DELETE_BLOG',
      id: id
    });
  }
}
 
export default blogReducer;