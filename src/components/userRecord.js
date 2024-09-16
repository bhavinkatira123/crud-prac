import React from 'react';
import styled from 'styled-components';

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 15px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ff0000;
  margin-left: 10px;

  &:hover {
    background-color: #b80000;
  }
`;

const UserRecord = ({ user, handleUpdateUser, handleDeleteUser }) => (
  <tr>
    <TableCell>{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.role}</TableCell>
    <TableCell>
      <Button onClick={() => handleUpdateUser(user)}>
        Edit
      </Button>
      <DeleteButton onClick={() => handleDeleteUser(user.id)}>
        Delete
      </DeleteButton>
    </TableCell>
  </tr>
)

export default UserRecord;