import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { userRoles } from '../constants';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 0px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserForm = ({ onSubmit, initialValues }) => {

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: initialValues,
  });

  const submitForm = (data) => {
    onSubmit(data);
  };

  const isUpdate = !!getValues().id;

  return (
    <FormContainer onSubmit={handleSubmit(submitForm)}>
      <Field>
        <Label htmlFor="name">Name:</Label>
        <Input
          id="name"
          {...register('name', {
            required: 'Name is required',
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </Field>

      <Field>
        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address!',
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </Field>

      <Field>
        <Label htmlFor="role">Role:</Label>
        <Select
          id="role"
          {...register('role', {
            required: 'Role is required',
          })}
        >
          <option value="">Select role</option>
          {userRoles.map((role, index) => (
            <option key={index} value={role}>{role}</option>
          ))}
        </Select>
        {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
      </Field>

      <SubmitButton type="submit">{`${isUpdate ? 'Update' : 'Add'} User`}</SubmitButton>
    </FormContainer>
  );
};

export default UserForm;
