import React, { ReactNode } from 'react';

import './Sidebar.scss';

export interface ISidebar {
  menuOpen: boolean;
  children: ReactNode;
}

export const Sidebar = ({ menuOpen, children }: ISidebar) => {
  const className = 'sidebar';

  return (
    <aside className={menuOpen ? `${className} ${className}_menu-open` : className}>
      {children}
    </aside>
  );
};
