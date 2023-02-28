import React from 'react';

import './Header.scss';

export const Header = (): JSX.Element => {
  return (
    <header className='header-wrapper'>
      <div className='header'>
        <div className='header__left-block'></div>
        <div className='header__right-block'></div>
      </div>
    </header>
  );
};
