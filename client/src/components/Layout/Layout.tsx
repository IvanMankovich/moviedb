import React, { useState, ReactNode } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Theme } from '../../types/types';
import { Sidebar } from '../Sidebar/Sidebar';
import { Main } from '../Main/Main';
import { Menu } from '../Menu/Menu';
import { MobileMenuDrawer } from '../MobileMenuDrawer/MobileMenuDrawer';
import { UserMenuDrawer } from '../UserMenuDrawer/UserMenuDrawer';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';

import { Button as AtndButton } from 'antd';

import './Layout.scss';

export interface ILayout {
  children: ReactNode;
  showModal: ReactNode | null;
  theme: Theme;
}

export enum OpenedDrawer {
  mobileMainMenu = 'mobileMainMenu',
  userMenu = 'userMenu',
}

export const Layout = ({ children, theme }: ILayout): JSX.Element => {
  const [open, setOpen] = useState<OpenedDrawer | null>(null);

  const onClose = () => {
    setOpen(null);
  };

  return (
    <div className={`theme-${theme}`}>
      <div className={`layout`}>
        <MobileMenuDrawer open={open === OpenedDrawer.mobileMainMenu} onClose={onClose} />
        <UserMenuDrawer open={open === OpenedDrawer.userMenu} onClose={onClose} />
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
            <Menu />
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
