import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Typography } from 'antd';
import Title from 'antd/es/typography/Title';

import { AddPersonForm } from '../../modules/AddPersonForm/AddPersonForm';
import { UploadFile } from 'antd/es/upload';

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
  personDescription;
  personDoB;
  personFullName;
  personGender;
  personName;
  personPlaceOfBirth;
  personPositions;
  personSocials;
  personWebsite;

  constructor(model: IAddPersonData) {
    this.personDescription = model.personDescription;
    this.personDoB = model.personDoB;
    this.personFullName = model.personFullName;
    this.personGender = model.personGender;
    this.personName = model.personName;
    this.personPlaceOfBirth = model.personPlaceOfBirth;
    this.personPositions = model.personPositions;
    this.personSocials = model.personSocials;
    this.personWebsite = model.personWebsite;
  }
}

export const AddPersonPage = (): JSX.Element => {
  // TODO: fix page style
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isAdded, setAdded] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const addPerson = async (values: IAddPersonData): Promise<void> => {
    const formData = new FormData();

    const data = new PersonDto(values);
    const personData = JSON.stringify(data);

    formData.append('personData', personData);

    if (values.personPic) {
      formData.append('personPic', values.personPic);
    }

    if (values.personGalleryPhotos?.length) {
      values.personGalleryPhotos.forEach((file) =>
        formData.append('personGalleryPhotos', file.originFileObj as File),
      );
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/people/create`, formData).then(
        () => {
          setAdded(true);
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
        <AddPersonForm addPerson={addPerson} isLoading={isLoading} errorMsg={errorMsg} />
      )}
    </>
  );
};
