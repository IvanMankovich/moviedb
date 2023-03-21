import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface IInnerLink {
  path: string;
  children: ReactNode;
}

export const InnerLink = ({ path, children }: IInnerLink) => {
  return <Link to={path}>{children}</Link>;
};
