import React, { ReactNode } from 'react';
import { Card, Typography } from 'antd';
import { ImgFallback } from '../ImgFallback/ImgFallback';

export interface IPersonCard {
  imgSrc?: string;
  title?: string;
  description?: string;
  cardClassName?: string;
  onClickAction?(): void;
  link?: ReactNode;
}

export const PersonCard = ({ imgSrc, title, description, cardClassName, link }: IPersonCard) => {
  return (
    <Card className={cardClassName} hoverable cover={<ImgFallback src={imgSrc} />}>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>
      {link ? link : null}
    </Card>
  );
};
