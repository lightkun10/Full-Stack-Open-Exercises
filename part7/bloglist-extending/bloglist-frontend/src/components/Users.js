import React from 'react';
import { Link } from "react-router-dom"
import { Paper, TableBody, TableContainer, 
  Table, TableRow, TableCell, TableHead } from '@material-ui/core';

const Users = ({ users }) => {
  return (
    // <table>
    //   <thead>
    //     <tr>
    //       <th></th>
    //       <th>blogs created</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {users.map((user) =>
    //       <tr key={user.id}>
    //           <td>
    //             <Link to={`/users/${user.id}`}>{user.name}</Link>
    //           </td>
    //         <td>{user.blogs.length}</td>
    //       </tr>
    //     )}
    //   </tbody>
    // </table>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Users
            </TableCell>
            <TableCell>
              blogs created
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) =>
            <TableRow key={user.id}>
              <TableCell>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>
                {user.blogs.length}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users;