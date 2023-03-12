import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { IUserData } from '../components/types';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface IUserContext {
  dispatch: React.Dispatch<IUserContextAction>;
  user: IUserData | null;
}

export interface IUserContextState {
  user: IUserData | null;
}

export enum UserContextAction {
  login = 'LOGIN',
  logout = 'LOGOUT',
}

export interface IUserContextAction {
  type: UserContextAction;
  payload: IUserData | null;
}

export const AuthContext = createContext<IUserContext | null>(null);

export const authReducer = (state: IUserContextState, action: IUserContextAction) => {
  switch (action.type) {
    case UserContextAction.login:
      return { user: action.payload };
    case UserContextAction.logout:
      return { user: null };
    default:
      return state;
  }
};

export interface IAuthContextProvider {
  children: ReactNode | ReactNode[];
}

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const { setItem } = useLocalStorage();

  useEffect(() => {
    const rawUserData = localStorage.getItem('user');
    const user = rawUserData ? JSON.parse(rawUserData) : null;

    if (user) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/token`, {
        withCredentials: true,
      });
      const { userData, accessToken } = response.data;
      dispatch({ type: UserContextAction.login, payload: userData });
      setItem('user', JSON.stringify(userData));
      setItem('accessToken', accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  console.log('AuthContext state:', state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
