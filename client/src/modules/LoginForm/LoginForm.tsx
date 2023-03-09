import React from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Input } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

export interface ILoginFormData {
  // email: string;
  password: string;
  userName: string;
  // remember: boolean;
}

export const LoginForm = (): JSX.Element => {
  const onFinish = async (values: ILoginFormData) => {
    console.log('Success:', values);
    await axios.post('http://localhost:4000/user/login', {
      ...values,
    });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<ILoginFormData>) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      {/* <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        label='Username'
        name='userName'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name='remember' valuePropName='checked'>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Button type='primary' htmlType='submit'>
        Login
      </Button>
    </Form>
  );
};
