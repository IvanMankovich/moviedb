import React, { ReactNode } from 'react';

import './PageContent.scss';

export interface IPageContent {
  children: ReactNode;
}

export const PageContent = ({ children }: IPageContent) => {
  return <main className='page-content'>{children}</main>;
};
