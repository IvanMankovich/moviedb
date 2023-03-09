import React from 'react';
import moment from 'moment';

import { Alert, Button, DatePicker, Form, Input, Select, Typography } from 'antd';

import './RegisterUserForm.scss';

export interface IOption {
  label: string;
  value: string;
}

export interface IRegisterUserData {
  userName: string;
  email: string;
  password: string;
  favoriteGenres: string[];
  about: string;
  dob?: Date;
}

export interface IRegisterFormData {
  user: IRegisterUserData;
}

export interface IRegisterUserForm {
  registerUser(values: IRegisterUserData): Promise<void>;
  isLoading: boolean;
  errorMsg: string;
}

export const RegisterUserForm = ({
  registerUser,
  isLoading,
  errorMsg,
}: IRegisterUserForm): JSX.Element => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
  };

  const config = {
    rules: [{ type: 'object' as const }],
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const options: IOption[] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  return (
    <>
      <Typography.Title level={3}>Register user form</Typography.Title>

      {errorMsg ? (
        <Alert message={'Registration error'} description={errorMsg} type='error' />
      ) : null}
      <Form
        {...layout}
        name='nest-messages'
        onFinish={registerUser}
        validateMessages={validateMessages}
        className='register-user-form'
        disabled={isLoading}
      >
        <Form.Item
          name={'userName'}
          label='Username (it will be visible for others)'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={'email'} label='Email' rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name={'favoriteGenres'} label='I like:'>
          <Select
            mode='multiple'
            allowClear
            style={{ width: '100%' }}
            placeholder='Select genre'
            onChange={handleChange}
            options={options}
          />
        </Form.Item>
        <Form.Item name={'dob'} label='DoB' {...config}>
          <DatePicker
            disabledDate={(current) => {
              const customDate = moment().format('YYYY-MM-DD');
              return current && current > moment(customDate, 'YYYY-MM-DD');
            }}
          />
        </Form.Item>
        <Form.Item name={'about'} label='About me'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
