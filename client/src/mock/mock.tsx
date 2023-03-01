import React from 'react';

import { IMenuSection } from '../components/Menu/MenuSection/MenuSection';
import { TrendingUpIcon } from '../components/Icon/TrendingUpIcon/TrendingUpIcon';
import { StarIcon } from '../components/Icon/StarIcon/StarIcon';
import { RecommendedIcon } from '../components/Icon/RecommendedIcon/RecommendedIcon';
import { FavoriteIcon } from '../components/Icon/FavoriteIcon/FavoriteIcon';
import { MovieFilterIcon } from '../components/Icon/MovieFilterIcon/MovieFilterIcon';

export const menuSections: IMenuSection[] = [
  {
    id: 'main',
    menuItems: [
      {
        id: 'trend',
        text: 'Trend',
        icon: <TrendingUpIcon />,
      },
      {
        id: 'recommended',
        text: 'Recommendations',
        icon: <RecommendedIcon />,
      },
      {
        id: 'top rated',
        text: 'Top rated',
        icon: <StarIcon />,
      },
      {
        id: 'catalogue',
        text: 'Catalogue',
        icon: <MovieFilterIcon />,
      },
      {
        id: 'my fav',
        text: 'My favorites',
        icon: <FavoriteIcon />,
      },
    ],
  },
];
