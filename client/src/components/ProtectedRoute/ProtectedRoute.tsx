import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export interface IProtectedRoute {
  isAllowed?: boolean;
  redirectPath?: string;
  children?: JSX.Element;
}

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: IProtectedRoute): JSX.Element => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
