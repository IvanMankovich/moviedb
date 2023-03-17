import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useAuthContext } from '../../hooks/useAuthContext';
import { UserContextAction } from '../../context/AuthContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { IUserData } from '../../components/types';

export interface ILoginFormData {
  userEmail: string;
  userPassword: string;
}

export interface ILoginResponse {
  accessToken: string;
  userData: IUserData;
}

export const LoginForm = (): JSX.Element => {
  const { dispatch } = useAuthContext();
  const { setItem } = useLocalStorage();
  const [isLogged, setLogged] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const onFinish = async (values: ILoginFormData) => {
    setLoading(true);
    await axios
      .post(`${import.meta.env.VITE_API_URL}/users/login`, {
        ...values,
      })
      .then(
        (res) => {
          const { userData, accessToken } = res.data;
          const image = new Image();
          image.src = `data:${userData.userPic.contentType};base64,${userData.userPic.data}`;
          userData.userPic = image.src;
          dispatch({ type: UserContextAction.login, payload: userData });
          setItem('user', JSON.stringify(userData));
          setItem('accessToken', accessToken);
          setLogged(true);
        },
        (err) => {
          setErrorMsg(err.response.data.errors);
        },
      )
      .finally(() => setLoading(false));
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<ILoginFormData>) => {
    console.log('Failed:', errorInfo);
  };

  return isLogged ? (
    <Alert
      message={'Registered successfully'}
      description={
        <>
          <Typography.Text>Logged in successfully.</Typography.Text>
        </>
      }
      type='success'
    />
  ) : (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      disabled={isLoading}
    >
      <Form.Item
        label='Email'
        name='userEmail'
        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='userPassword'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      {errorMsg ? (
        <Alert message={'Authorization error'} description={errorMsg} type='error' />
      ) : null}

      <Button type='primary' htmlType='submit'>
        Login
      </Button>
    </Form>
  );
};
