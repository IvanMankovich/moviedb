import React, { useState } from 'react';
import { Alert, Typography } from 'antd';
import Title from 'antd/es/typography/Title';

import { UploadFile } from 'antd/es/upload';
import { AddMovieForm } from '../../modules/AddMovieForm/AddMovieForm';

export interface IAddPersonData {
  personDescription: string;
  personDoB: string;
  personFullName: string;
  personGalleryPhotos: UploadFile[];
  personGender: string;
  personName: string;
  personPic: File;
  personPlaceOfBirth: string;
  personPositions: string[];
  personSocials: { facebook: string; twitter: string; instagram: string };
  personWebsite: string;
}

export const AddMoviePage = (): JSX.Element => {
  const [errorMsg] = useState<string>('');
  const [isAdded] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const addMovie = async (values: any): Promise<void> => {
    console.log(values);

    try {
      setLoading(true);
      setLoading(false);
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Title>Add person</Title>
      <Typography.Text>Add new person data to our database to use it later</Typography.Text>
      {isAdded ? (
        <Alert
          message={'Added successfully'}
          description={
            <>
              <Typography.Text>Person added successfully.</Typography.Text>
              <Typography.Text> </Typography.Text>
            </>
          }
          type='success'
        />
      ) : (
        <AddMovieForm addMovie={addMovie} isLoading={isLoading} errorMsg={errorMsg} />
      )}
    </>
  );
};
