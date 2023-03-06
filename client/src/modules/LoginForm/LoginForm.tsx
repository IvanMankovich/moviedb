import React from 'react';

import { Button, Checkbox, Form, Input } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

export interface ILoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export const LoginForm = (): JSX.Element => {
  const onFinish = (values: ILoginFormData) => {
    console.log('Success:', values);
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
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
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
