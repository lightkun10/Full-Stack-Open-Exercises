import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, TableBody, TableContainer, 
  Table, TableRow, TableCell } from '@material-ui/core';

const Blogs = ({ blogs }) => {
  console.log(blogs);
  const styleLink = { textDecoration: 'none' };

  return (

    <TableContainer component={Paper}>
    <Table>
      <TableBody>
        {blogs.map((blog) =>
          <TableRow key={blog.id}>
            <TableCell>
            <Link style={styleLink} to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </TableCell>
            <TableCell>
              {blog.user.name}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    </TableContainer>
  )
}

export default Blogs
