import React, { ReactNode } from 'react';
import { IMenuItem, MenuItem } from '../MenuItem/MenuItem';

import './MenuSection.scss';

export interface IMenuSection {
  id: string;
  menuItems: IMenuItem[];
}

export const MenuSection = ({ id, menuItems }: IMenuSection): JSX.Element => {
  return (
    <ul className='menu-section' id={id}>
      {menuItems.map(
        (item: IMenuItem): ReactNode => (
          <MenuItem key={item.id} {...item} />
        ),
      )}
    </ul>
  );
};
