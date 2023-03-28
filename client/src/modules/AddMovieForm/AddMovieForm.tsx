import React from 'react';
import {
  Button,
  Form,
  Input,
  DatePicker,
  Upload,
  Alert,
  Typography,
  InputNumber,
  Row,
  Col,
} from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import { AutocompleteCustom } from '../../components/AutocompleteCustom/AutocompleteCustom';
import { FormList } from '../../components/FromList/FormList';
import { FormItemProps } from 'antd';
import {
  ICountry,
  ICurrency,
  IFilmRating,
  IGenre,
  ILanguage,
  IPerson,
  IPosition,
  IProductionStage,
} from '../../types/types';

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

  const formListItemLayout: Pick<FormItemProps, 'labelCol' | 'wrapperCol'> = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
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
    return response.data.data.map((i: IPosition) => ({
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
    return response.data.data.map((i: IGenre) => ({
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
    return response.data.data.map((i: ICountry) => ({
      value: i._id,
      label: i.countryName,
    }));
  };

  const peopleRequest = async (value: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/people?qStr=${value}&qFields=personName&pg=1&sortField=personName&sortDir=1`,
    );
    return response.data.data.map((i: IPerson) => ({
      value: i._id,
      label: i.personName,
    }));
  };

  const filmRatingsRequest = async (value: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/film-ratings?qStr=${value}&qFields=filmRatingName&pg=1&sortField=filmRatingName&sortDir=1`,
    );
    return response.data.data.map((i: IFilmRating) => ({
      value: i._id,
      label: i.filmRatingName,
    }));
  };

  const productionStagesRequest = async (value: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/production-stages?qStr=${value}&qFields=productionStageName&pg=1&sortField=productionStageName&sortDir=1`,
    );
    return response.data.data.map((i: IProductionStage) => ({
      value: i._id,
      label: i.productionStageName,
    }));
  };

  const languagesRequest = async (value: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/languages?qStr=${value}&qFields=languageName&pg=1&sortField=languageName&sortDir=1`,
    );
    return response.data.data.map((i: ILanguage) => ({
      value: i._id,
      label: i.languageName,
    }));
  };

  const currenciesRequest = async (value: string) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/currencies?qStr=${value}&qFields=currencyCode&pg=1&sortField=currencyCode&sortDir=1`,
    );
    return response.data.data.map((i: ICurrency) => ({
      value: i._id,
      label: i.currencySymbol,
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

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['movieBudget', 'budgetAmount']}
              label='Budget'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <InputNumber min={0} placeholder={`Input budget`} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={['movieBudget', 'budgetCurrency']}
              label='Currency'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <AutocompleteCustom
                searchCallback={currenciesRequest}
                allowClear
                style={{ width: '100%' }}
                placeholder={`Currency`}
                showArrow={false}
                filterOption={false}
                showSearch
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['movieRevenue', 'revenueAmount']}
              label='Revenue'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <InputNumber min={0} placeholder={`Input revenue`} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name={['movieRevenue', 'revenueCurrency']}
              label='Currency'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <AutocompleteCustom
                searchCallback={currenciesRequest}
                allowClear
                style={{ width: '100%' }}
                placeholder={`Currency`}
                showArrow={false}
                filterOption={false}
                showSearch
              />
            </Form.Item>
          </Col>
        </Row>

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

        <FormList
          addBtnText={'Add art crew member'}
          formListName={'movieArtCrew'}
          formItems={[
            {
              label: 'Person',
              name: 'crewPerson',
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
              label: 'PersonPosition',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
              label: 'Person position',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
              label: 'Person position',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
              label: 'Person position',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
              label: 'Person position',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
              label: 'Person position',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
              label: 'Person position',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
              label: 'Person position',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
              label: 'Person position',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
              label: 'Person position',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
              label: 'Person position',
              name: 'crewPersonPosition',
              ...formListItemLayout,
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
