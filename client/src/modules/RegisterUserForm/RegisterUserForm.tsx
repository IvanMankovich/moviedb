import React from 'react';
import moment from 'moment';
import axios from 'axios';

import { PlusOutlined } from '@ant-design/icons';
import { Alert, Button, DatePicker, Form, Input, Typography, Upload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { IRegisterUserData } from '../../pages/Register/RegisterPage';
import { AutocompleteCustom } from '../../components/AutocompleteCustom/AutocompleteCustom';

import './RegisterUserForm.scss';

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
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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

  const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.file;
  };

  const genresRequest = async (value: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/genres?qStr=${value}&qFields=genreName&pg=1&sortField=genreName&sortDir=1`,
    );
    return response.data.data.map((i: { _id: string; genreName: string }) => ({
      value: i._id,
      label: i.genreName,
    }));
  };

  return (
    <>
      <Typography.Title level={3}>Register user form</Typography.Title>

      {errorMsg ? (
        <Alert message={'Registration error'} description={errorMsg} type='error' />
      ) : null}
      <Form
        {...layout}
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
        <Form.Item name={'userEmail'} label='Email' rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Password'
          name='userPassword'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name={'userFavoriteGenres'} label='I like:'>
          <AutocompleteCustom
            searchCallback={genresRequest}
            mode='multiple'
            allowClear
            style={{ width: '100%' }}
            placeholder={`Select favorite genres`}
            showArrow={false}
            filterOption={false}
            showSearch
          />
        </Form.Item>

        <Form.Item name='userPic' label='Avatar' valuePropName='file' getValueFromEvent={normFile}>
          <Upload
            name='logo'
            listType='picture-circle'
            beforeUpload={() => false}
            maxCount={1}
            multiple={false}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item name={'userDoB'} label='DoB' {...config}>
          <DatePicker
            disabledDate={(current) => {
              const customDate = moment().format('YYYY-MM-DD');
              return current && current > moment(customDate, 'YYYY-MM-DD');
            }}
          />
        </Form.Item>
        <Form.Item name={'userDescription'} label='About me'>
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
