import React, { ReactNode } from 'react';

import './Sidebar.scss';

export interface ISidebar {
  children: ReactNode;
}

export const Sidebar = ({ children }: ISidebar) => {
  return <aside className='sidebar'>{children}</aside>;
};
