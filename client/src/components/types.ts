import { ReactNode } from 'react';

export enum ButtonStyle {
  bordered = 'bordered',
  transparent = 'transparent',
}

export interface IMenuItem {
  label: ReactNode;
  key: string;
  icon?: ReactNode;
  onClick?(): void;
  path?: string;
}

export interface IFile {
  contentType: string;
  data: string;
}

export interface IUserBasicData {
  userName: string;
  userEmail: string;
  userPassword: string;
  userFavoriteGenres: string[];
  userDescription: string;
  userDoB: string;
  _id: string;
}

export interface IUserRawData extends IUserBasicData {
  userPic: null | IFile[];
}

export interface IUserParsedData extends IUserBasicData {
  userPic: null | string;
}

export interface CheckTokensResponse {
  accessToken: string;
  refreshToken: string;
  userData: IUserRawData;
}
