import React, { useState, ReactNode } from 'react';
import { NavigateFunction, To } from 'react-router-dom';
import { Button, Modal } from 'antd';

import { useModalStore } from '../../store/modalStore';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Theme } from '../../types/types';
import { Sidebar } from '../Sidebar/Sidebar';
import { Main } from '../Main/Main';
import { Menu } from '../Menu/Menu';
import { MobileMenuDrawer } from '../MobileMenuDrawer/MobileMenuDrawer';
import { UserMenuDrawer } from '../UserMenuDrawer/UserMenuDrawer';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';

import { favItemsLink, mainMenuItems } from '../../constants/mainMenuItems';
import { AuthMenuItems } from '../../modules/MenuItems/AuthMenuItems/AuthMenuItems';
import { UnauthMenuItems } from '../../modules/MenuItems/UnauthMenuItems/UnauthMenuItems';

import { IMenuItem, IUserParsedData } from '../types';

import './Layout.scss';
import { PageContent } from '../PageContent/PageContent';

export interface ILayout {
  children: ReactNode;
  theme: Theme;
  user: IUserParsedData | null;
  navigate: NavigateFunction;
}

export enum OpenedDrawer {
  mobileMainMenu = 'mobileMainMenu',
  userMenu = 'userMenu',
}

export const Layout = ({ children, user, navigate, theme }: ILayout): JSX.Element => {
  const [open, setOpen] = useState<OpenedDrawer | null>(null);
  const modal = useModalStore((state) => state.modal);
  const setModal = useModalStore((state) => state.setModal);

  const onClose = () => {
    setOpen(null);
  };

  const getMainMenuItems = (
    user: IUserParsedData | null,
    mainMenuItems: IMenuItem[],
  ): IMenuItem[] => {
    return (user ? [...mainMenuItems, favItemsLink] : mainMenuItems).map((item: IMenuItem) =>
      item.path
        ? {
            ...item,
            onClick: () => {
              onClose();
              navigate(item.path as To);
            },
          }
        : item,
    );
  };

  const menuItems = getMainMenuItems(user, mainMenuItems);

  return (
    <div className={`theme-${theme}`}>
      <div className={`layout`}>
        <MobileMenuDrawer
          open={open === OpenedDrawer.mobileMainMenu}
          onClose={onClose}
          menuItems={menuItems}
        />
        <UserMenuDrawer
          open={open === OpenedDrawer.userMenu}
          onClose={onClose}
          userData={user}
          menuItems={
            user ? (
              <AuthMenuItems />
            ) : (
              <UnauthMenuItems setModal={setModal} onClose={onClose} navigate={navigate} />
            )
          }
        />

        <Sidebar menuOpen={false}>
          <>
            <Button
              className='logo-btn'
              type={'text'}
              icon={<MovieIcon />}
              size={'large'}
              onClick={() => {
                navigate('/');
                onClose();
              }}
            ></Button>
            <Menu menuItems={menuItems} />
          </>
        </Sidebar>
        <Main>
          <Header setOpen={setOpen} userData={user} />
          <PageContent>{children}</PageContent>
          <Footer />
        </Main>
        <Modal
          title={modal?.title}
          open={modal ? true : false}
          onCancel={() => setModal(null)}
          footer={modal?.footer}
        >
          {modal?.modalContent}
        </Modal>
      </div>
    </div>
  );
};
