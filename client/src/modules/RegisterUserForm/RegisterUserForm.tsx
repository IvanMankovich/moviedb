import React from 'react';

import { Button, DatePicker, Form, Input, Select, Typography } from 'antd';
import moment from 'moment';

import './RegisterUserForm.scss';

export interface IOption {
  label: string;
  value: string;
}

export interface IRegisterUserData {
  about: string;
  dob: string;
  email: string;
  favoriteCategories: string[];
  firstName: string;
  lastName: string;
  nickname: string;
}

export interface IRegisterFormData {
  user: IRegisterUserData;
}

export const RegisterUserForm = (): JSX.Element => {
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
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = (values: IRegisterFormData) => {
    console.log(values);
  };

  const config = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
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
      <Typography.Text>
        Already registered? <Typography.Link>Log in</Typography.Link>
      </Typography.Text>

      <Form
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}
        className='register-user-form'
      >
        <Form.Item name={['user', 'firstName']} label='First Name' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'lastName']} label='Last Name' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'nickname']} label='Nickname' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label='Email'
          rules={[{ required: true, type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'favoriteCategories']}
          label='I like:'
          rules={[{ required: true }]}
        >
          <Select
            mode='multiple'
            allowClear
            style={{ width: '100%' }}
            placeholder='Please select'
            onChange={handleChange}
            options={options}
          />
        </Form.Item>
        <Form.Item name={['user', 'dob']} label='DoB' {...config}>
          <DatePicker
            disabledDate={(current) => {
              const customDate = moment().format('YYYY-MM-DD');
              return current && current > moment(customDate, 'YYYY-MM-DD');
            }}
          />
        </Form.Item>
        <Form.Item name={['user', 'about']} label='About me'>
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
