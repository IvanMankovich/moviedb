import React from 'react';

import '../Icon.scss';

export const MovieFilterIcon = (): JSX.Element => {
  return (
    <svg className='icon' viewBox='0 96 960 960'>
      <path d='m366 538-34 78-78 34 78 34 34 78 34-78 78-34-78-34-34-78Zm266-12-25 54-54 25 54 25 25 54 25-54 54-25-54-25-25-54ZM140 256l74 152h130l-74-152h89l74 152h130l-74-152h89l74 152h130l-74-152h112q24 0 42 18t18 42v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42V316q0-24 18-42t42-18Zm0 212v368h680V468H140Zm0 0v368-368Z' />
    </svg>
  );
};
