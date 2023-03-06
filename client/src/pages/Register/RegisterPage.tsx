import React from 'react';
import Title from 'antd/es/typography/Title';
import { RegisterUserForm } from '../../modules/RegisterUserForm/RegisterUserForm';

export interface IOption {
  label: string;
  value: string;
}

export const RegisterPage = (): JSX.Element => {
  return (
    <>
      <Title>Register new user</Title>
      <RegisterUserForm />
    </>
  );
};
