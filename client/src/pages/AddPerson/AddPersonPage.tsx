import React from 'react';
import { Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { AddPersonForm } from '../../modules/AddPersonForm/AddPersonForm';

export const AddPersonPage = (): JSX.Element => {
  // TODO: fix page style

  return (
    <>
      <Title>Add person</Title>
      <Typography.Text>Add new person data to our database to use it later</Typography.Text>
      <AddPersonForm />
    </>
  );
};
