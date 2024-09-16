import { useEffect, useState } from "react";
import styled from 'styled-components';

import UserList from "./components/userList";
import { users, userTabelHeader } from "./constants";
import UserForm from "./components/userForm";
import SearchBar from "./components/searchBar";
import Modal from "./components/modal";
import ConfirmationDialog from "./components/confirmationdialog";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
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

const App = () => {
  const [filteredUserData, setFilteredUserData] = useState(users);
  const [isOpenUserFormModal, setIsOpenUserFormModal] = useState(false);
  const [initialValues, setInitialValue] = useState({ name: '', email: '', role: '' });
  const [userId, setUserId] = useState(null);
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('userData')) || users;
    setFilteredUserData(existingUsers);
    localStorage.setItem('userData', JSON.stringify(existingUsers));
  }, []);

  const getUniqueId = () => {
    const existingUsers = JSON.parse(localStorage.getItem('userData')) || users;
    const uniqueId = Math.ceil(Math.random() * 100);
    const isUniqueIdExist = existingUsers.find((user) => user.id === uniqueId);
    if (isUniqueIdExist) {
      getUniqueId();
    }
    return uniqueId;
  }
  const onSubmitUser = (data) => {
    const newUser = { ...data, id: data.id || getUniqueId() };
    setFilteredUserData(prevUsers => {
      const updatedUsers = prevUsers.filter(user => user.id !== newUser.id);
      updatedUsers.unshift(newUser);
      localStorage.setItem('userData', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
    setIsOpenUserFormModal(false);
    setInitialValue({ name: '', email: '', role: '' });
  };

  const handleUpdateUser = (updatedUser) => {
    setInitialValue(updatedUser);
    setIsOpenUserFormModal(true);

  }

  const handleDeleteUser = (userId) => {
    setUserId(userId);
    setIsOpenDeleteUserModal(true);
  }

  const onDeleteUser = () => {
    setFilteredUserData(prevUsers => {
      const updatedUsers = prevUsers.filter(user => user.id !== userId);
      localStorage.setItem('userData', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
    setIsOpenDeleteUserModal(false);
    setUserId(null);
  }

  const onSearch = () => {
    if(searchValue) {
      setFilteredUserData((prevUsers) => prevUsers.filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase())));
    }
  }

  const onClear = () => {
    setSearchValue('');
    const allUsers = JSON.parse(localStorage.getItem('userData')) || users;
    setFilteredUserData(allUsers);
  }

  const onCloseUserFormModal = () => {
    setInitialValue({ name: '', email: '', role: '' });
    setIsOpenUserFormModal(false);
  }

  const onCloseUserDeleteModal = () => {
    setIsOpenDeleteUserModal(false);
    setUserId(null);
  }

  return (
    <Container>
      <SearchBar
        onChangeSearchValue={(value) => setSearchValue(value)}
        searchValue={searchValue}
        onSearch={onSearch}
        onClear={onClear}
      />
      <Button onClick={() => setIsOpenUserFormModal(true)}>Add User</Button>
      <UserList
        userData={filteredUserData}
        tableHeader={userTabelHeader}
        handleUpdateUser={handleUpdateUser}
        handleDeleteUser={handleDeleteUser}
      />
      <Modal isOpen={isOpenUserFormModal} onClose={onCloseUserFormModal}>
        <UserForm onSubmit={onSubmitUser} initialValues={initialValues} />
      </Modal>
      <Modal isOpen={isOpenDeleteUserModal} onClose={onCloseUserDeleteModal}>
        <ConfirmationDialog
          message='Are you sure, you want to delete this user?'
          onConfirm={onDeleteUser}
          onCancel={onCloseUserDeleteModal}
        />
      </Modal>
    </Container>
  );
}

export default App;
