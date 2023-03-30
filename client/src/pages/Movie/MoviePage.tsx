import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Skeleton, Typography, Image } from 'antd';
import { getMovie } from '../../queries/queries';

export const MoviePage = (): JSX.Element => {
  const pageParams = useParams();
  const movieId = pageParams?.id;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovie(movieId),
    enabled: !!movieId,
  });

  console.log(data);

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className='main-info'>
        <Typography.Title>{'Movie page'}</Typography.Title>
      </div>
    </>
  );
};
