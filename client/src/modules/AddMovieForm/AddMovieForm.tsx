import React from 'react';
import { Button, Form, Input, DatePicker, Upload, Alert, Typography, InputNumber } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import { AutocompleteCustom } from '../../components/AutocompleteCustom/AutocompleteCustom';
import { FormList } from '../../components/FromList/FormList';

export interface IAddMovieForm {
  addMovie(values: any): Promise<void>;
  isLoading: boolean;
  errorMsg: string;
}

export const AddMovieForm = ({ addMovie, isLoading, errorMsg }: IAddMovieForm) => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const normFilee = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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

  const genresRequest = async (value: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/genres?qStr=${value}&qFields=genreName&pg=1&sortField=genreName&sortDir=1`,
    );
    return response.data.data.map((i: { _id: string; genreName: string }) => ({
      value: i._id,
      label: i.genreName,
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
      <Typography.Title level={3}>Add new movie</Typography.Title>

      {errorMsg ? (
        <Alert message={'Adding new movie error'} description={errorMsg} type='error' />
      ) : null}
      <Form
        {...formItemLayout}
        form={form}
        onFinish={addMovie}
        style={{ minWidth: '100%', width: '100%' }}
        scrollToFirstError
        disabled={isLoading}
      >
        <Form.Item
          name='movieTitle'
          label='Title'
          rules={[{ required: true, message: 'Please input movie title!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <FormList
          addBtnText={'Add premiere'}
          formListName={'moviePremiers'}
          formItems={[
            {
              label: 'Premiere date',
              name: 'premiereDate',
              wrapperCol: { span: 24 },
              labelCol: { span: 24 },
              rules: [
                {
                  type: 'object' as const,
                  required: true,
                  message: 'Please select premiere date!',
                },
              ],
              children: <DatePicker />,
            },
            {
              label: 'Country',
              name: 'premiereCountry',
              wrapperCol: { span: 24 },
              labelCol: { span: 24 },
              rules: [{ required: true, message: `Please select country` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Country`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Restrictions',
              name: 'premiereRestrictions',
              wrapperCol: { span: 24 },
              labelCol: { span: 24 },
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Restrictions`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <Form.Item
          name={'movieGenres'}
          label='Genre:'
          rules={[{ required: true, message: `Please select movie genre`, type: 'array' }]}
        >
          <AutocompleteCustom
            searchCallback={genresRequest}
            mode='multiple'
            allowClear
            style={{ width: '100%' }}
            placeholder={`Select genres`}
            showArrow={false}
            filterOption={false}
            showSearch
          />
        </Form.Item>

        <Form.Item name='movieProductionPlace' label='Production place'>
          <AutocompleteCustom
            searchCallback={countriesRequest}
            mode='multiple'
            allowClear
            style={{ width: '100%' }}
            placeholder={`Select production place`}
            showArrow={false}
            filterOption={false}
            showSearch
          />
        </Form.Item>

        <Form.Item
          name='moviePoster'
          label='Movie poster'
          valuePropName='fileList'
          getValueFromEvent={normFilee}
        >
          <Upload
            name='moviePoster'
            listType='picture-card'
            beforeUpload={() => false}
            maxCount={10}
            multiple
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          name='movieBackdrop'
          label='Movie backdrop'
          valuePropName='fileList'
          getValueFromEvent={normFilee}
        >
          <Upload
            name='movieBackdrop '
            listType='picture-card'
            beforeUpload={() => false}
            maxCount={10}
            multiple
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item label='Duration'>
          <Form.Item name='movieDuration' noStyle>
            <InputNumber min={1} max={999} />
          </Form.Item>
          <span className='ant-form-text' style={{ marginLeft: 8 }}>
            min
          </span>
        </Form.Item>

        <Form.Item name='movieSlogan' label='Slogan'>
          <Input />
        </Form.Item>

        <Form.Item name='movieDescription' label='Description'>
          <Input.TextArea showCount maxLength={2000} />
        </Form.Item>

        <FormList
          addBtnText={'Add cast member'}
          formListName={'movieCast'}
          formItems={[
            {
              label: 'Person',
              name: 'castPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'as',
              name: 'castCharacterName',
              children: <Input placeholder={`Character name`} />,
            },
          ]}
        />

        <FormList
          addBtnText={'Add art crew member'}
          formListName={'movieArtCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'PersonPosition',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <FormList
          addBtnText={'Add camera crew member'}
          formListName={'movieCameraCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Person position',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <FormList
          addBtnText={'Add Costume & Make-Up crew member'}
          formListName={'movieCostumeMakeUpCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Person position',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <FormList
          addBtnText={'Add crew member'}
          formListName={'movieCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Person position',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <FormList
          addBtnText={'Add directing crew member'}
          formListName={'movieDirectingCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Person position',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <FormList
          addBtnText={'Add editing crew member'}
          formListName={'movieEditingCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Person position',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <FormList
          addBtnText={'Add lighting crew member'}
          formListName={'movieLightingCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Person position',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <FormList
          addBtnText={'Add production crew member'}
          formListName={'movieProductionCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Person position',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <FormList
          addBtnText={'Add sound crew member'}
          formListName={'movieSoundCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Person position',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <FormList
          addBtnText={'Add visual effects crew member'}
          formListName={'movieVisualEffectsCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Person position',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <FormList
          addBtnText={'Add writing crew member'}
          formListName={'movieWritingCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={countriesRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select person`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
            {
              label: 'Person position',
              name: 'crewPersonPosition',
              rules: [{ required: true, message: `Please select position` }],
              children: (
                <AutocompleteCustom
                  searchCallback={positionsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Select position`}
                  showArrow={false}
                  filterOption={false}
                  showSearch
                />
              ),
            },
          ]}
        />

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
