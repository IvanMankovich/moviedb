import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PersonCard } from '../../components/PersonCard/PersonCard';
import { CardsLoading } from '../../modules/CardsLoading/CardsLoading';
import { getPeople } from '../../queries/queries';
import { InnerLink } from '../../components/Link/Link';
import { Button, Typography } from 'antd';
import { PersonSearchForm } from '../../modules/PersonSearchForm/PersonSearchForm';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useNavigate } from 'react-router-dom';
import {
  formFields,
  getQueryString,
  parseFormToQuery,
  parseQueryToForm,
  searchFields,
} from './helpers';

export interface IPerson {
  _id: string;
  personName: string;
  personPositions: { positionName: string }[];
  personPic: {
    contentType: string;
    data: string;
  };
}

export interface ISearchPersonData {
  personDoB: string;
  personGender: string;
  personName: string;
  personPlaceOfBirth: string;
  personPositions: string[];
}

export const PeoplePage = (): JSX.Element => {
  const query = useQueryParams();
  const navigate = useNavigate();

  const findPerson = async (values: ISearchPersonData): Promise<void> => {
    const q: string[] = parseFormToQuery(values);
    if (q.length) {
      navigate(`/people?${q.join('&')}`);
    }
  };

  const searchString = getQueryString(searchFields, query);
  const inintialFormValues = parseQueryToForm(formFields, query);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['person', searchString],
    queryFn: () => getPeople(searchString),
  });

  if (isLoading) {
    return <CardsLoading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Typography.Title level={1}>People page</Typography.Title>
      <InnerLink path='/add-person'>
        <Button type='primary'>Add person</Button>
      </InnerLink>
      <PersonSearchForm
        searchPerson={findPerson}
        isLoading={false}
        errorMsg={''}
        initialValues={inintialFormValues}
        fieldFormValue={data?.data?.formData}
      />
      <div className='cards-container'>
        {data?.data?.data?.map?.((person: IPerson) => (
          <PersonCard
            cardClassName='cards-container__item'
            key={person._id}
            title={person.personName}
            description={person?.personPositions?.map?.((pos) => pos.positionName).join(', ')}
            imgSrc={
              person.personPic &&
              `data:${person.personPic?.contentType};base64,${person.personPic?.data}`
            }
            link={<InnerLink path={`/people/${person._id}`}>More...</InnerLink>}
          />
        ))}
      </div>
    </>
  );
};
