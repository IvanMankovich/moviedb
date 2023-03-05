import React from 'react';
import { Menu as AntdMenu } from 'antd';

import { IMenuItem } from '../types';

import './Menu.scss';

export interface IMenu {
  menuItems: IMenuItem[];
}

export const Menu = ({ menuItems }: IMenu): JSX.Element => {
  return (
    <AntdMenu
      className='side-menu'
      mode={'vertical'}
      theme={'light'}
      items={menuItems}
      selectable={false}
    />
  );
};
