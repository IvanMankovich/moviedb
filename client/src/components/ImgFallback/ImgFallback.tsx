import React from 'react';
import { Image } from 'antd';
import fallbackSvg from '../../static-assets/fallbackImg.svg';

export interface IImgFallback {
  src?: string;
  fallback?: string;
}

export const ImgFallback = ({ src, fallback }: IImgFallback): JSX.Element => {
  return <Image src={src} fallback={fallback ? fallback : fallbackSvg} />;
};
