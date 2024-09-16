import React from 'react';
import styled from 'styled-components';
import UserRecord from './userRecord';

const TableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto; /* Allows horizontal scrolling if needed */
  margin: 20px auto;
  padding: 0 20px;
`;

const Table = styled.table`
  width: 100%;
`;

const TableHeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
`;

const UserList = ({ userData, tableHeader, handleUpdateUser, handleDeleteUser }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {tableHeader.map((header, index) => (
              <TableHeaderCell key={index}>{header}</TableHeaderCell>
            ))}
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <UserRecord
              key={index}
              handleUpdateUser={handleUpdateUser}
              handleDeleteUser={handleDeleteUser}
              user={user}
            />
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
