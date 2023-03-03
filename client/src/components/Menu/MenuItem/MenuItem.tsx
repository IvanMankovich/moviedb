import React, { ReactNode } from 'react';
import './MenuItem.scss';

import { Menu } from 'antd';

export interface IMenuItem {
  id: string;
  text?: string;
  icon?: ReactNode;
  onClick?(): void;
}

export const MenuItem = ({ text, icon, onClick }: IMenuItem) => {
  return (
    <Menu.Item className='menu-item'>
      {text ? <p className='menu-item__text'>{text}</p> : null}
      {icon ? <div className='menu-item__icon'>{icon}</div> : null}
    </Menu.Item>
    // <li className='menu-item' onClick={onClick}>
    //   {text ? <p className='menu-item__text'>{text}</p> : null}
    //   {icon ? <div className='menu-item__icon'>{icon}</div> : null}
    // </li>
  );
};
