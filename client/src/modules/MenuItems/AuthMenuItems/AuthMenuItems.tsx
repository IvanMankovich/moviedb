import React from 'react';
import axios from 'axios';
import { Menu as AntdMenu } from 'antd';

import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { UserContextAction } from '../../../context/AuthContext';
import { useAuthContext } from '../../../hooks/useAuthContext';

import { LogoutIcon } from '../../../components/Icon/LogoutIcon/LogoutIcon';
import { FavoriteIcon } from '../../../components/Icon/FavoriteIcon/FavoriteIcon';
import { SettingsIcon } from '../../../components/Icon/SettingsIcon/SettingsIcon';
import { IMenuItem } from '../../../components/types';

export const AuthMenuItems = (): JSX.Element => {
  const { removeItem } = useLocalStorage();
  const { dispatch } = useAuthContext();

  const menuItems: IMenuItem[] = [
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
      onClick: async () => {
        await axios.delete(`${import.meta.env.VITE_API_URL}/users/logout`).then(
          () => {
            removeItem('user');
            removeItem('accessToken');
            dispatch({
              type: UserContextAction.login,
              payload: null,
            });
          },
          (err) => {
            console.log(err.response.data.errors);
          },
        );
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
