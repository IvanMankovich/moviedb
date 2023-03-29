import React, { ReactNode } from 'react';

import { Drawer, Button, List, Divider } from 'antd';

import { CloseIcon } from '../Icon/CloseIcon/CloseIcon';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';
import { Avatar } from '../Avatar/Avatar';

import { IUserParsedData } from '../types';

import './UserMenuDrawer.scss';

export interface IUserMenuDrawer {
  onClose(): void;
  open: boolean;
  userData: IUserParsedData | null;
  menuItems: ReactNode;
}

export const UserMenuDrawer = ({
  onClose,
  open,
  userData,
  menuItems,
}: IUserMenuDrawer): JSX.Element => {
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
          <List.Item.Meta avatar={<Avatar userData={userData} />} title={userData?.userName} />
          <Divider />
        </>
      ) : null}
      {menuItems}
    </Drawer>
  );
};
