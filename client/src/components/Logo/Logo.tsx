import React from 'react';
import { MovieIcon } from '../Icon/MovieIcon/MovieIcon';
import { Link } from '../Link/Link';

import './Logo.scss';

export const Logo = () => {
  return (
    <div className='logo-container'>
      <Link href='/' title='Movidb'>
        <MovieIcon />
      </Link>
    </div>
  );
};
