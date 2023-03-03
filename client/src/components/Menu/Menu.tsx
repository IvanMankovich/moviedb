import React from 'react';
import { Menu as AntdMenu } from 'antd';

import { TrendingUpIcon } from '../Icon/TrendingUpIcon/TrendingUpIcon';
import { RecommendedIcon } from '../Icon/RecommendedIcon/RecommendedIcon';
import { StarIcon } from '../Icon/StarIcon/StarIcon';
import { MovieFilterIcon } from '../Icon/MovieFilterIcon/MovieFilterIcon';
import { FavoriteIcon } from '../Icon/FavoriteIcon/FavoriteIcon';
import { SearchIcon } from '../Icon/SearchIcon/SearchIcon';
import { HomeIcon } from '../Icon/HomeIcon/HomeIcon';

import { IMenuItem } from '../types';

import './Menu.scss';

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
  {
    key: 'trend',
    label: (
      <>
        <div className='menu-item__icon'>
          <TrendingUpIcon />
        </div>
        <p className='menu-item__text'>Trend</p>
      </>
    ),
  },
  {
    key: 'recommended',
    label: (
      <>
        <div className='menu-item__icon'>
          <RecommendedIcon />
        </div>
        <p className='menu-item__text'>Recommendations</p>
      </>
    ),
  },
  {
    key: 'topRated',
    label: (
      <>
        <div className='menu-item__icon'>
          <StarIcon />
        </div>
        <p className='menu-item__text'>Top rated</p>
      </>
    ),
  },
  {
    key: 'catalogue',
    label: (
      <>
        <div className='menu-item__icon'>
          <MovieFilterIcon />
        </div>
        <p className='menu-item__text'>Catalogue</p>
      </>
    ),
  },
  {
    key: 'myFav',
    label: (
      <>
        <div className='menu-item__icon'>
          <FavoriteIcon />
        </div>
        <p className='menu-item__text'>My favorites</p>
      </>
    ),
  },
];

export const Menu = (): JSX.Element => {
  return <AntdMenu className='side-menu' mode={'vertical'} theme={'light'} items={menuItems} />;
};
