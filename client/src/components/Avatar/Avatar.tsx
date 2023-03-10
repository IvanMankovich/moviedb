import React from 'react';
import { Avatar as AntdAvatar } from 'antd';

import { IUserData } from '../types';
import { PersonIcon } from '../Icon/PersonIcon/PersonIcon';

export interface IAvatar {
  userData: IUserData | null;
}

export const Avatar = ({ userData }: IAvatar): JSX.Element => {
  const userFullName: string = userData ? userData?.userName : 'Unknown user';

  return (
    <AntdAvatar icon={userData ? null : <PersonIcon />} src={userData ? userData?.userPic : null}>
      {userData && userData?.userPic ? userData?.userPic : userFullName?.trim?.()?.[0]}
    </AntdAvatar>
  );
};
