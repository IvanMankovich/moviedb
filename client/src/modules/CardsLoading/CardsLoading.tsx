import React from 'react';
import { Card, Skeleton } from 'antd';
import { PeopleIcon } from '../../components/Icon/PeopleIcon/PeopleIcon';
import '../../style/cards.scss';

export const CardsLoading = (): JSX.Element => {
  return (
    <div className='cards-container'>
      <Card className='cards-container__item' hoverable cover={<PeopleIcon />}>
        <Skeleton />
      </Card>

      <Card className='cards-container__item' hoverable cover={<PeopleIcon />}>
        <Skeleton />
      </Card>

      <Card className='cards-container__item' hoverable cover={<PeopleIcon />}>
        <Skeleton />
      </Card>

      <Card className='cards-container__item' hoverable cover={<PeopleIcon />}>
        <Skeleton />
      </Card>

      <Card className='cards-container__item' hoverable cover={<PeopleIcon />}>
        <Skeleton />
      </Card>

      <Card className='cards-container__item' hoverable cover={<PeopleIcon />}>
        <Skeleton />
      </Card>
    </div>
  );
};
