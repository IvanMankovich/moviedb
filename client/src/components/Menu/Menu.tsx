import React, { ReactNode } from 'react';
import { IMenuSection, MenuSection } from './MenuSection/MenuSection';

import './Menu.scss';

export interface IMenu {
  menuSections: IMenuSection[];
}

export const Menu = ({ menuSections }: IMenu): JSX.Element => {
  return (
    <section className='menu'>
      {menuSections.map(
        (item: IMenuSection): ReactNode => (
          <MenuSection key={item.id} id={item.id} menuItems={item.menuItems} />
        ),
      )}
    </section>
  );
};
