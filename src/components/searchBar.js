import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 200px;
  outline: none;
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

const ClearButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const SearchBar = ({ searchValue, onChangeSearchValue, onSearch, onClear }) => (
  <SearchContainer>
    <Input
      type='text'
      value={searchValue}
      onChange={(e) => onChangeSearchValue(e.target.value)}
      placeholder='Search'
    />
    <Button disabled={!searchValue} onClick={onSearch}>Search</Button>
    <ClearButton onClick={onClear}>Clear</ClearButton>
  </SearchContainer>
);

export default SearchBar;
