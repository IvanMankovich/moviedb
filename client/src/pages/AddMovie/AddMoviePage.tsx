import React, { useState } from 'react';
import { Alert, Typography } from 'antd';
import Title from 'antd/es/typography/Title';

import { UploadFile } from 'antd/es/upload';
import { AddMovieForm, IMovieData } from '../../modules/AddMovieForm/AddMovieForm';
import { authInterceptor } from '../../axiosInterceptors/authInterceptor';

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

class PersonDto {
  movieArtCrew;
  movieBackdrop;
  movieBudget;
  movieCameraCrew;
  movieCast;
  movieCostumeMakeUpCrew;
  movieCrew;
  movieDescription;
  movieDirectingCrew;
  movieDuration;
  movieEditingCrew;
  movieGenres;
  movieLanguage;
  movieLightingCrew;
  moviePoster;
  moviePremiers;
  movieProductionCrew;
  movieProductionPlace;
  movieRevenue;
  movieSlogan;
  movieSoundCrew;
  movieStage;
  movieTitle;
  movieVisualEffectsCrew;
  movieWritingCrew;

  constructor(model: IMovieData) {
    this.movieArtCrew = model.movieArtCrew;
    this.movieBackdrop = model.movieBackdrop;
    this.movieBudget = model.movieBudget;
    this.movieCameraCrew = model.movieCameraCrew;
    this.movieCast = model.movieCast;
    this.movieCostumeMakeUpCrew = model.movieCostumeMakeUpCrew;
    this.movieCrew = model.movieCrew;
    this.movieDescription = model.movieDescription;
    this.movieDirectingCrew = model.movieDirectingCrew;
    this.movieDuration = model.movieDuration;
    this.movieEditingCrew = model.movieEditingCrew;
    this.movieGenres = model.movieGenres;
    this.movieLanguage = model.movieLanguage;
    this.movieLightingCrew = model.movieLightingCrew;
    this.moviePoster = model.moviePoster;
    this.moviePremiers = model.moviePremiers;
    this.movieProductionCrew = model.movieProductionCrew;
    this.movieProductionPlace = model.movieProductionPlace;
    this.movieRevenue = model.movieRevenue;
    this.movieSlogan = model.movieSlogan;
    this.movieSoundCrew = model.movieSoundCrew;
    this.movieStage = model.movieStage;
    this.movieTitle = model.movieTitle;
    this.movieVisualEffectsCrew = model.movieVisualEffectsCrew;
    this.movieWritingCrew = model.movieWritingCrew;
  }
}

export const AddMoviePage = (): JSX.Element => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isAdded, setAdded] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const addMovie = async (values: IMovieData): Promise<void> => {
    const formData = new FormData();

    const data = new PersonDto(values);
    const movieData = JSON.stringify(data);

    formData.append('movieData', movieData);

    if (values.moviePoster?.length) {
      values.moviePoster.forEach((file) =>
        formData.append('moviePoster', file.originFileObj as File),
      );
    }

    if (values.movieBackdrop?.length) {
      values.movieBackdrop.forEach((file) =>
        formData.append('movieBackdrop', file.originFileObj as File),
      );
    }

    try {
      setLoading(true);
      await authInterceptor.post(`${import.meta.env.VITE_API_URL}/movies`, formData).then(
        () => {
          // setAdded(true);
          setLoading(false);
        },
        (err) => {
          setErrorMsg(err?.response?.data?.errors?.join?.(` `) ?? '');
          setLoading(false);
        },
      );
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Title>Add movie</Title>
      <Typography.Text>Add new movie data to our database</Typography.Text>
      {isAdded ? (
        <Alert
          message={'Added successfully'}
          description={
            <>
              <Typography.Text>Person added successfully.</Typography.Text>
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
