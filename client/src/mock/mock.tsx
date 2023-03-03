import React from 'react';

import { TrendingUpIcon } from '../components/Icon/TrendingUpIcon/TrendingUpIcon';
import { RecommendedIcon } from '../components/Icon/RecommendedIcon/RecommendedIcon';
import { StarIcon } from '../components/Icon/StarIcon/StarIcon';
import { MovieFilterIcon } from '../components/Icon/MovieFilterIcon/MovieFilterIcon';
import { FavoriteIcon } from '../components/Icon/FavoriteIcon/FavoriteIcon';
import { SearchIcon } from '../components/Icon/SearchIcon/SearchIcon';
import { HomeIcon } from '../components/Icon/HomeIcon/HomeIcon';

import { IMenuItem } from '../components/types';

export const menuItems: IMenuItem[] = [
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
