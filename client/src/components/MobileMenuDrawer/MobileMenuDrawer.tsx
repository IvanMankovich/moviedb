import React, { useState, useEffect, ReactNode } from 'react';

import { Drawer, Button as AtndButton, Menu as AntdMenu } from 'antd';
import { TrendingUpIcon } from '../Icon/TrendingUpIcon/TrendingUpIcon';
import { RecommendedIcon } from '../Icon/RecommendedIcon/RecommendedIcon';
import { StarIcon } from '../Icon/StarIcon/StarIcon';
import { MovieFilterIcon } from '../Icon/MovieFilterIcon/MovieFilterIcon';
import { FavoriteIcon } from '../Icon/FavoriteIcon/FavoriteIcon';
import { SearchIcon } from '../Icon/SearchIcon/SearchIcon';
import { CloseIcon } from '../Icon/CloseIcon/CloseIcon';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';
import { HomeIcon } from '../Icon/HomeIcon/HomeIcon';

import './MobileMenuDrawer.scss';

export interface IMobileMenuDrawer {
  onClose(): void;
  open: boolean;
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
    label: 'Home',
    icon: <HomeIcon />,
  },
  {
    key: 'search',
    label: 'Search',
    icon: <SearchIcon />,
  },
  {
    key: 'trend',
    label: 'Trend',
    icon: <TrendingUpIcon />,
  },
  {
    key: 'recommended',
    label: 'Recommendations',
    icon: <RecommendedIcon />,
  },
  {
    key: 'topRated',
    label: 'Top rated',
    icon: <StarIcon />,
  },
  {
    key: 'catalogue',
    label: 'Catalogue',
    icon: <MovieFilterIcon />,
  },
  {
    key: 'myFav',
    label: 'My favorites',
    icon: <FavoriteIcon />,
  },
];

export const MobileMenuDrawer = ({ onClose, open }: IMobileMenuDrawer) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);

    return () => window.removeEventListener('resize', handleResize, false);
  }, []);

  useEffect(() => {
    if (width >= 320 && open) {
      onClose();
    }
  }, [width]);

  return (
    <Drawer
      className='mobile-menu-drawer'
      placement={'left'}
      width={'100%'}
      height={'100%'}
      onClose={onClose}
      open={open}
      closable={false}
    >
      <header>
        <AtndButton
          className='logo-btn'
          type={'link'}
          href='/'
          icon={<MovieIcon />}
          size={'large'}
          onClick={onClose}
        ></AtndButton>
        <AtndButton
          className='close-menu-btn'
          type={'text'}
          icon={<CloseIcon />}
          size={'large'}
          onClick={onClose}
        ></AtndButton>
      </header>
      <AntdMenu mode={'vertical'} theme={'light'} items={menuItems} />
    </Drawer>
  );
};
