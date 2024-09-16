import React from 'react';
import styled from 'styled-components';

const DialogContainer = styled.div`
  text-align: center
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

const CancelButton = styled(Button)`
  background-color: #ff0000;
  margin-left: 10px;

  &:hover {
    background-color: #b80000;
  }
`;

const ConfirmationDialog = ({ onConfirm, message, onCancel }) => {
  return (
    <DialogContainer>
      <p>{message}</p>
      <div>
        <Button onClick={onConfirm} primary>
          Confirm
        </Button>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </div>
    </DialogContainer>
  );
};

export default ConfirmationDialog;
