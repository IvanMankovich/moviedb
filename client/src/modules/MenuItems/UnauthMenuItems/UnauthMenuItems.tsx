import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Menu as AntdMenu } from 'antd';

import { LoginIcon } from '../../../components/Icon/LoginIcon/LoginIcon';
import { KeyIcon } from '../../../components/Icon/KeyIcon/KeyIcon';
import { ISetModal } from '../../../store/modalStore';
import { LoginForm } from '../../LoginForm/LoginForm';
import { IMenuItem } from '../../../components/types';

export interface IUnauthMenuItems {
  setModal: ISetModal;
  onClose(): void;
  navigate: NavigateFunction;
}

export const UnauthMenuItems = ({ setModal, onClose, navigate }: IUnauthMenuItems) => {
  const menuItems: IMenuItem[] = [
    {
      key: 'login',
      label: (
        <>
          <div className='menu-item__icon'>
            <LoginIcon />
          </div>
          <p className='menu-item__text'>Login</p>
        </>
      ),
      onClick: () => {
        setModal({
          title: 'Login',
          modalContent: <LoginForm />,
          onCancel: () => setModal(null),
          footer: null,
        });
      },
    },
    {
      key: 'register',
      label: (
        <>
          <div className='menu-item__icon'>
            <KeyIcon />
          </div>
          <p className='menu-item__text'>Register</p>
        </>
      ),
      onClick: () => {
        onClose();
        navigate('register');
      },
    },
  ];

  return (
    <AntdMenu
      className='user-menu'
      mode={'vertical'}
      theme={'light'}
      items={menuItems}
      selectable={false}
    />
  );
};
