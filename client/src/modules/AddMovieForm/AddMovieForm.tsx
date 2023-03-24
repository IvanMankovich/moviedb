import React from 'react';
import {
  Button,
  Form,
  Input,
  DatePicker,
  Upload,
  Alert,
  Typography,
  Space,
  InputNumber,
} from 'antd';
import dayjs from 'dayjs';
import { UploadChangeParam } from 'antd/es/upload';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import axios from 'axios';

import { AutocompleteCustom } from '../../components/AutocompleteCustom/AutocompleteCustom';

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

  const dobConfig = {
    rules: [{ type: 'object' as const }],
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

        <Form.List name='moviePremiers'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                  <Form.Item
                    {...restField}
                    name={[name, 'date']}
                    label='Premiere date'
                    {...dobConfig}
                  >
                    <DatePicker
                      disabledDate={(current) => {
                        const customDate = dayjs().format('YYYY-MM-DD');
                        return current && current > dayjs(customDate, 'YYYY-MM-DD');
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'country']}
                    label='Country'
                    rules={[{ required: true, message: `Please input country!` }]}
                  >
                    <AutocompleteCustom
                      searchCallback={countriesRequest}
                      allowClear
                      style={{ width: '100%' }}
                      placeholder={`Country`}
                      showArrow={false}
                      filterOption={false}
                      showSearch
                    />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, 'restrictions']} label='Restriction'>
                    {/* TODO: add resctrictions collection */}
                    <AutocompleteCustom
                      searchCallback={countriesRequest}
                      allowClear
                      style={{ width: '100%' }}
                      placeholder={`Restrictions`}
                      showArrow={false}
                      filterOption={false}
                      showSearch
                    />
                  </Form.Item>
                  <MinusOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  Add premiere
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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

        <Form.List name='movieCast'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                  {/* !TODO: add person search  */}
                  <Form.Item
                    {...restField}
                    name={[name, 'person']}
                    label='Person'
                    rules={[{ required: true, message: `Please input person name!` }]}
                  >
                    <AutocompleteCustom
                      searchCallback={countriesRequest}
                      allowClear
                      style={{ width: '100%' }}
                      placeholder={`Select person`}
                      showArrow={false}
                      filterOption={false}
                      showSearch
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'characterName']}
                    label='as'
                    rules={[{ required: true, message: `Please input person role!` }]}
                  >
                    <Input placeholder={`Character name`} />
                  </Form.Item>
                  <MinusOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  Add cast member
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name='movieCrew'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                  {/* !TODO: add person search  */}
                  <Form.Item
                    {...restField}
                    name={[name, 'person']}
                    label='Person'
                    rules={[{ required: true, message: `Please input person name!` }]}
                  >
                    <AutocompleteCustom
                      searchCallback={countriesRequest}
                      allowClear
                      style={{ width: '100%' }}
                      placeholder={`Select person`}
                      showArrow={false}
                      filterOption={false}
                      showSearch
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'person']}
                    label='Position'
                    rules={[{ required: true, message: `Please input person name!` }]}
                  >
                    <AutocompleteCustom
                      searchCallback={positionsRequest}
                      allowClear
                      style={{ width: '100%' }}
                      placeholder={`Select position`}
                      showArrow={false}
                      filterOption={false}
                      showSearch
                    />
                  </Form.Item>

                  <MinusOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  Add crew member
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item name='movieProductionPlace' label='Production place'>
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

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
