import React, { useState, ReactNode } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Theme } from '../../types/types';
import { Sidebar } from '../Sidebar/Sidebar';
import { Main } from '../Main/Main';
import { Logo } from '../Logo/Logo';
import { Menu } from '../Menu/Menu';

import { Button as AtndButton, Drawer, Space } from 'antd';

import './Layout.scss';

import { menuSections } from '../../mock/mock';
import { MobileMenuDrawer } from '../MobileMenuDrawer/MobileMenuDrawer';
import { UserMenuDrawer } from '../UserMenuDrawer/UserMenuDrawer';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';

export interface ILayout {
  children: ReactNode;
  showModal: ReactNode | null;
  theme: Theme;
}

export const Layout = ({ children, theme }: ILayout): JSX.Element => {
  const [open, setOpen] = useState<'mob' | 'user' | null>(null);

  const onClose = () => {
    setOpen(null);
  };

  return (
    <div className={`theme-${theme}`}>
      <div className={`layout`}>
        <MobileMenuDrawer open={open === 'mob'} onClose={onClose} />
        <UserMenuDrawer open={open === 'user'} onClose={onClose} />
        <Sidebar menuOpen={false}>
          <>
            <AtndButton
              className='logo-btn'
              type={'text'}
              href='/'
              icon={<MovieIcon />}
              size={'large'}
              onClick={onClose}
            ></AtndButton>
            <Menu menuSections={menuSections} />
          </>
        </Sidebar>
        <Main>
          <Header setOpen={setOpen} />
          {children}
          <Footer />
        </Main>
      </div>
    </div>
  );
};
