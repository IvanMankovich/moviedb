import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ISetModal } from '../../store/modalStore';

import { Drawer, Button, Menu as AntdMenu, List, Divider } from 'antd';

import { CloseIcon } from '../Icon/CloseIcon/CloseIcon';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';
import { LogoutIcon } from '../Icon/LogoutIcon/LogoutIcon';
import { LoginIcon } from '../Icon/LoginIcon/LoginIcon';
import { FavoriteIcon } from '../Icon/FavoriteIcon/FavoriteIcon';
import { KeyIcon } from '../Icon/KeyIcon/KeyIcon';
import { SettingsIcon } from '../Icon/SettingsIcon/SettingsIcon';
import { Avatar } from '../Avatar/Avatar';

import { LoginForm } from '../../modules/LoginForm/LoginForm';

import { IMenuItem, IUserData } from '../types';

import './UserMenuDrawer.scss';

export interface IUserMenuDrawer {
  onClose(): void;
  open: boolean;
  userData?: IUserData;
  setModal: ISetModal;
}

export const UserMenuDrawer = ({ onClose, open, userData, setModal }: IUserMenuDrawer) => {
  const navigate = useNavigate();

  const menuItems: IMenuItem[] = userData
    ? [
        {
          key: 'preferences',
          label: (
            <>
              <div className='menu-item__icon'>
                <FavoriteIcon />
              </div>
              <p className='menu-item__text'>My preferences</p>
            </>
          ),
          onClick: () => {
            alert('Preferences');
          },
        },
        {
          key: 'settings',
          label: (
            <>
              <div className='menu-item__icon'>
                <SettingsIcon />
              </div>
              <p className='menu-item__text'>Settings</p>
            </>
          ),
          onClick: () => {
            alert('Settings');
          },
        },
        {
          key: 'logout',
          label: (
            <>
              <div className='menu-item__icon'>
                <LogoutIcon />
              </div>
              <p className='menu-item__text'>Logout</p>
            </>
          ),
          onClick: () => {
            alert('Logout');
          },
        },
      ]
    : [
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
    <Drawer
      className='user-menu-drawer'
      placement={'right'}
      height={'100%'}
      onClose={onClose}
      open={open}
      closable={false}
      style={{
        width: '100%',
        maxWidth: '20rem',
      }}
      bodyStyle={{
        width: '100%',
        maxWidth: '20rem',
        padding: 0,
      }}
    >
      <header>
        <Button
          className='logo-btn'
          type={'link'}
          href='/'
          icon={<MovieIcon />}
          size={'large'}
          onClick={onClose}
        ></Button>
        <Button
          className='close-menu-btn'
          type={'text'}
          icon={<CloseIcon />}
          size={'large'}
          onClick={onClose}
        ></Button>
      </header>
      {userData ? (
        <>
          <List.Item.Meta
            avatar={<Avatar userData={userData} />}
            title={`${userData?.firstName} ${userData?.lastName}`}
          />
          <Divider />
        </>
      ) : null}
      <AntdMenu
        className='user-menu'
        mode={'vertical'}
        theme={'light'}
        items={menuItems}
        selectable={false}
      />
    </Drawer>
  );
};
