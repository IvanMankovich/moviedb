import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Title from 'antd/es/typography/Title';
import { RegisterUserForm } from '../../modules/RegisterUserForm/RegisterUserForm';
import { Alert, Typography } from 'antd';
import { useModalStore } from '../../store/modalStore';
import { LoginForm } from '../../modules/LoginForm/LoginForm';

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
  userPic: File;
  dob?: Date;
}

export const RegisterPage = (): JSX.Element => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isRegistered, setRegistered] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const setModal = useModalStore((state) => state.setModal);

  const navigate = useNavigate();

  const registerUser = async (values: IRegisterUserData): Promise<void> => {
    const formData = new FormData();

    formData.append('userName', values.userName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append(
      'favoriteGenres',
      values.favoriteGenres?.length?.toString?.() ?? values.favoriteGenres,
    );
    formData.append('about', values.about ?? '');
    formData.append('userPic', values.userPic);
    formData.append('dob', values.dob?.toISOString?.() ?? '');

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, formData).then(
        () => {
          setRegistered(true);
          setLoading(false);
        },
        (err) => {
          setErrorMsg(err?.response?.data?.errors?.join?.(` `) ?? '');
          setLoading(false);
        },
      );
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };

  const onLoginLinkClick = (): void => {
    setModal({
      title: 'Login',
      modalContent: <LoginForm />,
      onCancel: () => setModal(null),
      footer: null,
    });
  };

  return (
    <>
      <Title>Register user</Title>
      <Typography.Text>
        Already registered? <Typography.Link onClick={onLoginLinkClick}>Log in</Typography.Link>
      </Typography.Text>
      {isRegistered ? (
        <Alert
          message={'Registered successfully'}
          description={
            <>
              <Typography.Text>User registered successfully.</Typography.Text>
              <Typography.Text>
                {' '}
                <Typography.Link onClick={onLoginLinkClick}>Login</Typography.Link> or{' '}
                <Typography.Link
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  go to homepage
                </Typography.Link>
              </Typography.Text>
            </>
          }
          type='success'
        />
      ) : (
        <RegisterUserForm registerUser={registerUser} isLoading={isLoading} errorMsg={errorMsg} />
      )}
    </>
  );
};
