import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Drawer, Button as AtndButton, Menu as AntdMenu } from 'antd';
import { CloseIcon } from '../Icon/CloseIcon/CloseIcon';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';

import { IMenuItem } from '../types';

import './MobileMenuDrawer.scss';

export interface IMobileMenuDrawer {
  onClose(): void;
  open: boolean;
  menuItems: IMenuItem[];
}

export const MobileMenuDrawer = ({ onClose, open, menuItems }: IMobileMenuDrawer) => {
  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);

    return () => window.removeEventListener('resize', handleResize, false);
  }, []);

  useEffect(() => {
    if (width >= 320 && open) {
      onClose();
    }
  }, [width]);

  return (
    <Drawer
      className='mobile-menu-drawer'
      placement={'left'}
      width={'100%'}
      height={'100%'}
      onClose={onClose}
      open={open}
      closable={false}
    >
      <header>
        <AtndButton
          className='logo-btn'
          type={'link'}
          icon={<MovieIcon />}
          size={'large'}
          onClick={() => {
            onClose();
            navigate('/');
          }}
        ></AtndButton>

        <AtndButton
          className='close-menu-btn'
          type={'text'}
          icon={<CloseIcon />}
          size={'large'}
          onClick={onClose}
        ></AtndButton>
      </header>
      <AntdMenu className='mobile-menu' mode={'vertical'} theme={'light'} items={menuItems} />
    </Drawer>
  );
};
