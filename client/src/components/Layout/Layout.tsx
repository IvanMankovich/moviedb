import React, { useState, ReactNode } from 'react';
import { To, useNavigate } from 'react-router-dom';

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

import { Button, Modal } from 'antd';

import { mainMenuItems } from '../../constants/mainMenuItems';
import { IMenuItem } from '../types';

import './Layout.scss';
// import { userData } from '../../mock/mock';

export interface ILayout {
  children: ReactNode;
  theme: Theme;
}

export enum OpenedDrawer {
  mobileMainMenu = 'mobileMainMenu',
  userMenu = 'userMenu',
}

export const Layout = ({ children, theme }: ILayout): JSX.Element => {
  const [open, setOpen] = useState<OpenedDrawer | null>(null);
  const modal = useModalStore((state) => state.modal);
  const setModal = useModalStore((state) => state.setModal);

  const onClose = () => {
    setOpen(null);
  };

  const navigate = useNavigate();

  const parsedMainMenuItems = mainMenuItems.map((item: IMenuItem) =>
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

  return (
    <div className={`theme-${theme}`}>
      <div className={`layout`}>
        <MobileMenuDrawer
          open={open === OpenedDrawer.mobileMainMenu}
          onClose={onClose}
          menuItems={parsedMainMenuItems}
        />
        <UserMenuDrawer
          open={open === OpenedDrawer.userMenu}
          onClose={onClose}
          setModal={setModal}
          // userData={userData}
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
            <Menu menuItems={parsedMainMenuItems} />
          </>
        </Sidebar>
        <Main>
          <Header
            setOpen={setOpen}
            // userData={userData}
          />
          {children}
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
