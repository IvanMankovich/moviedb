import React, { useState } from 'react';
import { AutoComplete, Button, Form, Input, Select, DatePicker, Upload } from 'antd';
import moment from 'moment';
import { UploadChangeParam } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export interface IOption {
  label: string;
  value: string;
}

export const AddPersonForm = () => {
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

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const options: IOption[] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

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

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      style={{ minWidth: '100%', width: '100%' }}
      scrollToFirstError
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

      <Form.Item name={'personPositions'} label='Position:'>
        <Select
          mode='multiple'
          allowClear
          style={{ width: '100%' }}
          placeholder={`Select person's position`}
          onChange={handleChange}
          options={options}
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
        <Select placeholder='select your gender'>
          <Option value='male'>Male</Option>
          <Option value='female'>Female</Option>
          <Option value='other'>Other</Option>
        </Select>
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
        <Select
          showSearch
          placeholder='Select a person'
          optionFilterProp='children'
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'tom',
              label: 'Tom',
            },
          ]}
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
  );
};
