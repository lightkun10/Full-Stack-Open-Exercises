import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blogs = ({ blog, onDelete }) => {
  const [detailVisible, setDetailVisible] = useState('view');

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVisibleClick = () => {
    setDetailVisible(detailVisible === 'view' ? 'hide' : 'view')
  }

  // const toggleDetailView = () => (
  //   <div className="blogs__entry__content__detail">
  //     <div className="blogs__entry__content__detail__url">
  //       {blog.url}
  //     </div>
  //     <div className="blogs__entry__content__detail__author">
  //       {blog.author}
  //     </div>
  //     <div className="blogs__entry__content__detail__deletebutton">
  //       {onDelete ?
  //         <button id="deleteButton" onClick={onDelete}>remove</button> :
  //         ''
  //       }
  //     </div>
  //   </div>
  // )

  // console.log(blog)
  return (
    <div style={blogStyle} className="blog__entry">
      <div className="blogs__entry__content">
        <div className='blogs__entry__content__title'>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
        {/* <div className='blogs__entry__content__author'>
          {blog.author}
        </div> */}
        {/* <button
          id="detailButton"
          className="blogs__entry__button__toggledetail"
          onClick={handleVisibleClick}>{detailVisible}
        </button>

        {detailVisible === 'hide'
        ? toggleDetailView() : ''
        } */}
      </div>
      
    </div>
  )
}

export default Blogs
