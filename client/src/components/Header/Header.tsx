import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button as AtndButton } from 'antd';
import { PersonIcon } from '../Icon/PersonIcon/PersonIcon';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';

import './Header.scss';

export interface IHeader {
  setOpen: React.Dispatch<React.SetStateAction<'mob' | 'user' | null>>;
}

export const Header = ({ setOpen }: IHeader): JSX.Element => {
  return (
    <header className='header-wrapper'>
      <div className='header'>
        <AtndButton
          className='mob-menu-btn'
          type={'text'}
          icon={<MenuOutlined />}
          size={'large'}
          onClick={() => setOpen('mob')}
        />
        <AtndButton
          className='logo-btn'
          type={'text'}
          href='/'
          icon={<MovieIcon />}
          size={'large'}
        ></AtndButton>
        <AtndButton
          className='user-menu-btn'
          type={'text'}
          icon={<PersonIcon />}
          size={'large'}
          onClick={() => setOpen('user')}
        />
        {/* <div className='header__left-block'></div>
        <div className='header__right-block'></div> */}
      </div>
    </header>
  );
};
