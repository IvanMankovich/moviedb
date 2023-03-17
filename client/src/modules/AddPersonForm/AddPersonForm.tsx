import React, { useState } from 'react';
import { AutoComplete, Button, Form, Input, DatePicker, Upload, Alert, Typography } from 'antd';
import moment from 'moment';
import { UploadChangeParam } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { IAddPersonData } from '../../pages/AddPerson/AddPersonPage';

import { AutocompleteCustom } from '../../components/AutocompleteCustom/AutocompleteCustom';

export interface IRegisterUserForm {
  addPerson(values: IAddPersonData): Promise<void>;
  isLoading: boolean;
  errorMsg: string;
}

export const AddPersonForm = ({ addPerson, isLoading, errorMsg }: IRegisterUserForm) => {
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

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const dobConfig = {
    rules: [{ type: 'object' as const }],
  };

  const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.file;
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
      }/positions?qStr=${value}&qFields=personPosition&pg=1&sortField=personPosition&sortDir=1`,
    );
    return response.data.data.map((i: { _id: string; personPosition: string }) => ({
      value: i._id,
      label: i.personPosition,
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
      <Typography.Title level={3}>Add person form</Typography.Title>

      {errorMsg ? (
        <Alert message={'Create person error'} description={errorMsg} type='error' />
      ) : null}
      <Form
        {...formItemLayout}
        form={form}
        onFinish={addPerson}
        style={{ minWidth: '100%', width: '100%' }}
        scrollToFirstError
        disabled={isLoading}
      >
        <Form.Item
          name='personName'
          label='Person name'
          rules={[{ required: true, message: 'Please input person name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='personFullName' label='Person full name'>
          <Input />
        </Form.Item>

        <Form.Item
          name={'personPositions'}
          label='Position:'
          rules={[{ required: true, message: `Please input person's position!`, type: 'array' }]}
        >
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

        <Form.Item
          name='personPic'
          label='Person title photo'
          valuePropName='file'
          getValueFromEvent={normFile}
        >
          <Upload
            name='logo'
            listType='picture-card'
            beforeUpload={() => false}
            maxCount={1}
            multiple={false}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          name='personGender'
          label='Gender'
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <AutocompleteCustom
            searchCallback={gendersRequest}
            allowClear
            style={{ width: '100%' }}
            placeholder={`Select gender`}
          />
        </Form.Item>

        <Form.Item name='personDoB' label='Date of birth' {...dobConfig}>
          <DatePicker
            disabledDate={(current) => {
              const customDate = moment().format('YYYY-MM-DD');
              return current && current > moment(customDate, 'YYYY-MM-DD');
            }}
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

        <Form.Item
          name='personWebsite'
          label='Website'
          rules={[{ required: true, message: 'Please input website!' }]}
        >
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder='website'>
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item name={['personSocials', 'facebook']} label='Facebook page'>
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder='Facebook'>
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item name={['personSocials', 'twitter']} label='Twitter page'>
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder='Twitter'>
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item name={['personSocials', 'instagram']} label='Instagram page'>
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder='Instagram'>
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item name='personDescription' label='About'>
          <Input.TextArea showCount maxLength={2000} />
        </Form.Item>

        <Form.Item
          name='personGalleryPhotos'
          label='Person gallery photos'
          valuePropName='fileList'
          getValueFromEvent={normFilee}
        >
          <Upload
            name='logo'
            listType='picture-card'
            beforeUpload={() => false}
            maxCount={10}
            multiple={true}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
