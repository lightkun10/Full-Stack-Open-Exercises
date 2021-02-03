import React from 'react';
import { Link } from "react-router-dom"

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
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default User;