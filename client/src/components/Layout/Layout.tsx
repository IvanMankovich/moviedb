import React, { ReactNode } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Backdrop } from '../Backdrop/Backdrop';
import { Theme } from '../../types/types';
import { Sidebar } from '../Sidebar/Sidebar';
import { Main } from '../Main/Main';
import { Logo } from '../Logo/Logo';
import { Menu } from '../Menu/Menu';

import './Layout.scss';
import { menuSections } from '../../mock/mock';

export interface ILayout {
  children: ReactNode;
  showModal: ReactNode | null;
  theme: Theme;
}

export const Layout = ({ children, showModal, theme }: ILayout): JSX.Element => {
  return (
    <div className={`theme-${theme}`}>
      <div className={`layout${showModal ? ' blur' : ''}`}>
        <Sidebar>
          <>
            <Logo />
            <Menu menuSections={menuSections} />
          </>
        </Sidebar>
        <Main>
          <Header />
          {children}
          <Footer />
        </Main>
      </div>
      {showModal ? <Backdrop content={showModal} /> : null}
    </div>
  );
};
