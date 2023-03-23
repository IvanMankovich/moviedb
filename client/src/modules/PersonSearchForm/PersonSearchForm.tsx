import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import { Alert, Button, DatePicker, Form, Input, Typography } from 'antd';
import { AutocompleteCustom } from '../../components/AutocompleteCustom/AutocompleteCustom';
import { ISearchPersonData } from '../../pages/People/PeoplePage';
import { ICountry, IGender, IPosition } from '../../types/types';

export interface ISelectableValues {
  personGender?: IGender;
  personPlaceOfBirth?: ICountry;
  personPositions?: IPosition;
}

export interface ISearchPersonForm {
  searchPerson(values: ISearchPersonData): Promise<void>;
  isLoading: boolean;
  errorMsg: string;
  initialValues?: ISearchPersonFormData;
  fieldFormValue?: ISelectableValues;
}

export interface ISearchPersonFormData {
  qStr?: string;
  personGender?: string;
  personPlaceOfBirth?: string;
  personPositions?: string[];
  personDoBfrom?: dayjs.Dayjs;
  personDoBto?: dayjs.Dayjs;
}

export const PersonSearchForm = ({
  searchPerson,
  isLoading,
  errorMsg,
  initialValues,
  fieldFormValue,
}: ISearchPersonForm) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const config = {
    rules: [{ type: 'object' as const }],
  };

  const positionsRequest = async (value: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/positions?qStr=${value}&qFields=positionName&pg=1&sortField=positionName&sortDir=1`,
    );
    return response.data.data.map((i: IPosition) => ({
      value: i._id,
      label: i.positionName,
    }));
  };

  const gendersRequest = async (value: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/genders?qStr=${value}&qFields=genderName&pg=1&sortField=genderName&sortDir=1`,
    );
    return response.data.data.map((i: IGender) => ({
      value: i._id,
      label: i.genderName,
    }));
  };

  const countriesRequest = async (value: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/countries?qStr=${value}&qFields=countryName&pg=1&sortField=countryName&sortDir=1`,
    );
    return response.data.data.map((i: ICountry) => ({
      value: i._id,
      label: i.countryName,
    }));
  };

  return (
    <>
      <Typography.Title level={3}>Search</Typography.Title>

      {errorMsg ? <Alert message={'Search error'} description={errorMsg} type='error' /> : null}
      <Form
        {...layout}
        onFinish={searchPerson}
        className='register-user-form'
        disabled={isLoading}
        initialValues={initialValues}
      >
        <Form.Item name={'qStr'} label='Person name'>
          <Input placeholder={`Person name`} />
        </Form.Item>

        <Form.Item name='personGender' label='Gender'>
          <AutocompleteCustom
            searchCallback={gendersRequest}
            allowClear
            style={{ width: '100%' }}
            placeholder={`Select gender`}
            defaultOptions={
              fieldFormValue?.personGender
                ? [
                    {
                      value: fieldFormValue.personGender._id,
                      label: fieldFormValue.personGender.genderName,
                    },
                  ]
                : []
            }
          />
        </Form.Item>

        <Form.Item name='personPlaceOfBirth' label='Place of birth'>
          <AutocompleteCustom
            searchCallback={countriesRequest}
            allowClear
            style={{ width: '100%' }}
            placeholder={`Select person's place of birth`}
            showArrow={false}
            filterOption={false}
            showSearch
            defaultOptions={
              fieldFormValue?.personPlaceOfBirth
                ? [
                    {
                      value: fieldFormValue.personPlaceOfBirth._id,
                      label: fieldFormValue.personPlaceOfBirth.countryName,
                    },
                  ]
                : []
            }
          />
        </Form.Item>

        <Form.Item name={'personPositions'} label='Position:' rules={[{ type: 'array' }]}>
          <AutocompleteCustom
            searchCallback={positionsRequest}
            mode='multiple'
            allowClear
            style={{ width: '100%' }}
            placeholder={`Select person's position`}
            showArrow={false}
            filterOption={false}
            showSearch
            defaultOptions={
              fieldFormValue?.personPositions
                ? [
                    {
                      value: fieldFormValue.personPositions._id,
                      label: fieldFormValue.personPositions.positionName,
                    },
                  ]
                : []
            }
          />
        </Form.Item>

        <Form.Item name={'personDoBfrom'} label='Date of birth from' {...config}>
          <DatePicker />
        </Form.Item>

        <Form.Item name={'personDoBto'} label='Date of birth to' {...config}>
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Search
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
