import React from 'react';
import axios from 'axios';

import { Alert, Button, DatePicker, Form, Input, Typography } from 'antd';
import { AutocompleteCustom } from '../../components/AutocompleteCustom/AutocompleteCustom';
import { ISearchPersonData } from '../../pages/People/PeoplePage';

export interface ISearchPersonForm {
  searchPerson(values: ISearchPersonData): Promise<void>;
  isLoading: boolean;
  errorMsg: string;
}

export const PersonSearchForm = ({ searchPerson, isLoading, errorMsg }: ISearchPersonForm) => {
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
    return response.data.data.map((i: { _id: string; positionName: string }) => ({
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
    return response.data.data.map((i: { _id: string; genderName: string }) => ({
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
    return response.data.data.map((i: { _id: string; countryName: string }) => ({
      value: i._id,
      label: i.countryName,
    }));
  };

  return (
    <>
      <Typography.Title level={3}>Search</Typography.Title>

      {errorMsg ? <Alert message={'Search error'} description={errorMsg} type='error' /> : null}
      <Form {...layout} onFinish={searchPerson} className='register-user-form' disabled={isLoading}>
        <Form.Item name={'qStr'} label='Person name'>
          <Input placeholder={`Person name`} />
        </Form.Item>

        <Form.Item
          name='personGender'
          label='Gender'
          rules={[{ message: 'Please select gender!' }]}
        >
          <AutocompleteCustom
            searchCallback={gendersRequest}
            allowClear
            style={{ width: '100%' }}
            placeholder={`Select gender`}
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
