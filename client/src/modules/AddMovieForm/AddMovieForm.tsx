import React from 'react';
import { Button, Form, Input, DatePicker, Upload, Alert, Typography, InputNumber } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';

import { AutocompleteCustom } from '../../components/AutocompleteCustom/AutocompleteCustom';
import { FormList } from '../../components/FromList/FormList';
import { getCurrencyAndAmountFields, formListItemLayout, getFormLists } from './helpers';
import {
  countriesRequest,
  currenciesRequest,
  filmRatingsRequest,
  genresRequest,
  languagesRequest,
  peopleRequest,
  productionStagesRequest,
} from '../../queries/queries';

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

        <Form.Item
          name='movieStage'
          label='Production stage'
          rules={[{ required: true, message: 'Please select production stage' }]}
        >
          <AutocompleteCustom
            searchCallback={productionStagesRequest}
            allowClear
            style={{ width: '100%' }}
            placeholder={`Select production stage`}
          />
        </Form.Item>

        {getCurrencyAndAmountFields([
          {
            name: 'movieBudget',
            numberField: {
              label: 'Budget',
              name: 'budgetAmount',
              placeholder: 'Input budget',
            },
            autocompleteField: {
              searchCallback: currenciesRequest,
              label: 'Currency',
              name: 'budgetCurrency',
              placeholder: 'Select currency',
            },
          },
          {
            name: 'movieRevenue',
            numberField: {
              label: 'Revenue',
              name: 'revenueAmount',
              placeholder: 'Input revenue',
            },
            autocompleteField: {
              searchCallback: currenciesRequest,
              label: 'Currency',
              name: 'revenueCurrency',
              placeholder: 'Select currency',
            },
          },
        ])}

        <Form.Item name={'movieLanguage'} label='Original language'>
          <AutocompleteCustom
            searchCallback={languagesRequest}
            allowClear
            style={{ width: '100%' }}
            placeholder={`Language`}
            showArrow={false}
            filterOption={false}
            showSearch
          />
        </Form.Item>

        <FormList
          addBtnText={'Add premiere'}
          formListName={'moviePremiers'}
          formItems={[
            {
              label: 'Premiere date',
              name: 'premiereDate',
              ...formListItemLayout,
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
              ...formListItemLayout,
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
              label: 'Rating',
              name: 'premiereRating',
              ...formListItemLayout,
              children: (
                <AutocompleteCustom
                  searchCallback={filmRatingsRequest}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={`Rating`}
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
              ...formListItemLayout,
              rules: [{ required: true, message: `Please select person` }],
              children: (
                <AutocompleteCustom
                  searchCallback={peopleRequest}
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
              ...formListItemLayout,
              children: <Input placeholder={`Character name`} />,
            },
          ]}
        />

        {getFormLists([
          {
            addBtnText: 'Add art crew member',
            formListName: 'movieArtCrew',
          },
          {
            addBtnText: 'Add camera crew member',
            formListName: 'movieCameraCrew',
          },
          {
            addBtnText: 'Add Costume & Make-Up crew member',
            formListName: 'movieCostumeMakeUpCrew',
          },
          {
            addBtnText: 'Add crew member',
            formListName: 'movieCrew',
          },
          {
            addBtnText: 'Add directing crew member',
            formListName: 'movieDirectingCrew',
          },
          {
            addBtnText: 'Add editing crew member',
            formListName: 'movieEditingCrew',
          },
          {
            addBtnText: 'Add lighting crew member',
            formListName: 'movieLightingCrew',
          },
          {
            addBtnText: 'Add production crew member',
            formListName: 'movieProductionCrew',
          },
          {
            addBtnText: 'Add sound crew member',
            formListName: 'movieSoundCrew',
          },
          {
            addBtnText: 'Add visual effects crew member',
            formListName: 'movieVisualEffectsCrew',
          },
          {
            addBtnText: 'Add writing effects crew member',
            formListName: 'movieWritingCrew',
          },
        ])}

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
