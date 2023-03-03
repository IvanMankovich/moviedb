import React, { ReactNode } from 'react';
import { IMenuSection, MenuSection } from './MenuSection/MenuSection';
import { Menu as AntdMenu } from 'antd';

import { TrendingUpIcon } from '../Icon/TrendingUpIcon/TrendingUpIcon';
import { RecommendedIcon } from '../Icon/RecommendedIcon/RecommendedIcon';
import { StarIcon } from '../Icon/StarIcon/StarIcon';
import { MovieFilterIcon } from '../Icon/MovieFilterIcon/MovieFilterIcon';
import { FavoriteIcon } from '../Icon/FavoriteIcon/FavoriteIcon';
import { SearchIcon } from '../Icon/SearchIcon/SearchIcon';
import { CloseIcon } from '../Icon/CloseIcon/CloseIcon';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';
import { HomeIcon } from '../Icon/HomeIcon/HomeIcon';

import './Menu.scss';

export interface IMenu {
  menuSections: IMenuSection[];
}

export interface IMenuItem {
  label: ReactNode;
  key: string;
  icon?: ReactNode;
  onClick?(): void;
}

const menuItems: IMenuItem[] = [
  {
    key: 'home',
    label: (
      <>
        <div className='menu-item__icon'>
          <HomeIcon />
        </div>
        <p className='menu-item__text'>Home</p>
      </>
    ),
  },
  {
    key: 'search',
    label: (
      <>
        <div className='menu-item__icon'>
          <SearchIcon />
        </div>
        <p className='menu-item__text'>Search</p>
      </>
    ),
  },
  // {
  //   key: 'trend',
  //   label: 'Trend',
  //   icon: <TrendingUpIcon />,
  // },
  // {
  //   key: 'recommended',
  //   label: 'Recommendations',
  //   icon: <RecommendedIcon />,
  // },
  // {
  //   key: 'topRated',
  //   label: 'Top rated',
  //   icon: <StarIcon />,
  // },
  // {
  //   key: 'catalogue',
  //   label: 'Catalogue',
  //   icon: <MovieFilterIcon />,
  // },
  // {
  //   key: 'myFav',
  //   label: 'My favorites',
  //   icon: <FavoriteIcon />,
  // },
];

export const Menu = ({ menuSections }: IMenu): JSX.Element => {
  // const menuItems: IMenuItem[] = ;

  return (
    <AntdMenu className='side-menu' mode={'vertical'} theme={'light'} items={menuItems} />
    // <section className='menu'>
    //   {menuSections.map(
    //     (item: IMenuSection): ReactNode => (
    //       <MenuSection key={item.id} id={item.id} menuItems={item.menuItems} />
    //     ),
    //   )}
    // </section>
  );
};
