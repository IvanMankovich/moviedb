import React from 'react';

import { FavoriteIcon } from '../components/Icon/FavoriteIcon/FavoriteIcon';
import { HomeIcon } from '../components/Icon/HomeIcon/HomeIcon';
import { MovieFilterIcon } from '../components/Icon/MovieFilterIcon/MovieFilterIcon';
import { PeopleIcon } from '../components/Icon/PeopleIcon/PeopleIcon';
import { RecommendedIcon } from '../components/Icon/RecommendedIcon/RecommendedIcon';
import { SearchIcon } from '../components/Icon/SearchIcon/SearchIcon';
import { StarIcon } from '../components/Icon/StarIcon/StarIcon';
import { TrendingUpIcon } from '../components/Icon/TrendingUpIcon/TrendingUpIcon';
import { IMenuItem } from '../components/types';

export const mainMenuItems: IMenuItem[] = [
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
    path: '/',
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
    path: 'search',
  },
  {
    key: 'trending',
    label: (
      <>
        <div className='menu-item__icon'>
          <TrendingUpIcon />
        </div>
        <p className='menu-item__text'>Trending</p>
      </>
    ),
    path: 'trending',
  },
  {
    key: 'recommedations',
    label: (
      <>
        <div className='menu-item__icon'>
          <RecommendedIcon />
        </div>
        <p className='menu-item__text'>Recommendations</p>
      </>
    ),
    path: 'recommedations',
  },
  {
    key: 'top-rated',
    label: (
      <>
        <div className='menu-item__icon'>
          <StarIcon />
        </div>
        <p className='menu-item__text'>Top rated</p>
      </>
    ),
    path: 'top-rated',
  },
  {
    key: 'people',
    label: (
      <>
        <div className='menu-item__icon'>
          <PeopleIcon />
        </div>
        <p className='menu-item__text'>People</p>
      </>
    ),
    path: 'people',
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
    path: 'catalogue',
  },
];

export const favItemsLink: IMenuItem = {
  key: 'favorites',
  label: (
    <>
      <div className='menu-item__icon'>
        <FavoriteIcon />
      </div>
      <p className='menu-item__text'>My favorites</p>
    </>
  ),
  path: 'favorites',
};
