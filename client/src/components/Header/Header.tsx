import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Avatar } from '../Avatar/Avatar';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';
import { OpenedDrawer } from '../Layout/Layout';

import { IUserParsedData } from '../types';

import './Header.scss';

export interface IHeader {
  setOpen: React.Dispatch<React.SetStateAction<OpenedDrawer | null>>;
  userData: IUserParsedData | null;
}

export const Header = ({ setOpen, userData }: IHeader): JSX.Element => {
  const navigate = useNavigate();
  return (
    <header className='header-wrapper'>
      <div className='header'>
        <Button
          className='mob-menu-btn'
          type={'text'}
          icon={<MenuOutlined />}
          size={'large'}
          onClick={() => setOpen(OpenedDrawer.mobileMainMenu)}
        />
        <Button
          className='logo-btn'
          type={'text'}
          icon={<MovieIcon />}
          size={'large'}
          onClick={() => navigate('/')}
        ></Button>
        <Button
          className='user-menu-btn'
          type={'text'}
          size={'large'}
          shape={'circle'}
          onClick={() => setOpen(OpenedDrawer.userMenu)}
        >
          <Avatar userData={userData} />
        </Button>
      </div>
    </header>
  );
};
