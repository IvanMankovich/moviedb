import React, { ReactNode } from 'react';

import './Main.scss';

export interface IMainContent {
  children: ReactNode;
}

export const Main = ({ children }: IMainContent): JSX.Element => {
  return <div className='main-content'>{children}</div>;
};
