import React from 'react';
import { Avatar as AntdAvatar } from 'antd';

import { IUserData } from '../types';
import { PersonIcon } from '../Icon/PersonIcon/PersonIcon';

export interface IAvatar {
  userData?: IUserData;
}

export const Avatar = ({ userData }: IAvatar): JSX.Element => {
  const userFullName: string = userData
    ? `${userData?.firstName} ${userData?.lastName}`
    : 'Unknown user';

  return (
    <AntdAvatar icon={userData ? null : <PersonIcon />} src={userData ? userData?.avatarSrc : null}>
      {userData && userData?.avatarSrc ? userData?.avatarSrc : userFullName.trim()[0]}
    </AntdAvatar>
  );
};
