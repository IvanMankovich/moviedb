import React, { ReactNode } from 'react';

import { Drawer, Button as AtndButton, Menu as AntdMenu } from 'antd';

import { CloseIcon } from '../Icon/CloseIcon/CloseIcon';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';

import { LogoutIcon } from '../Icon/LogoutIcon/LogoutIcon';

import './UserMenuDrawer.scss';

export interface IUserMenuDrawer {
  onClose(): void;
  open: boolean;
}

export interface IMenuItem {
  label: ReactNode;
  key: string;
  icon?: ReactNode;
  onClick?(): void;
}

const menuItems: IMenuItem[] = [
  {
    key: 'logout',
    label: 'Logout',
    icon: <LogoutIcon />,
  },
];

export const UserMenuDrawer = ({ onClose, open }: IUserMenuDrawer) => {
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
        <AtndButton
          className='logo-btn'
          type={'link'}
          href='/'
          icon={<MovieIcon />}
          size={'large'}
          onClick={onClose}
        ></AtndButton>
        <AtndButton
          className='close-menu-btn'
          type={'text'}
          icon={<CloseIcon />}
          size={'large'}
          onClick={onClose}
        ></AtndButton>
      </header>
      <AntdMenu mode={'vertical'} theme={'light'} items={menuItems} />
    </Drawer>
  );
};
