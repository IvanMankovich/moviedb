import React from 'react';

import { Form, InputNumber, Row, Col, FormItemProps } from 'antd';
import {
  AutocompleteCustom,
  IOption,
} from '../../components/AutocompleteCustom/AutocompleteCustom';
import { FormList } from '../../components/FromList/FormList';
import { peopleRequest, positionsRequest } from '../../queries/queries';

export const formListItemLayout: Pick<FormItemProps, 'labelCol' | 'wrapperCol'> = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export interface ICurrencyAndAmountField {
  name: string;
  numberField: {
    label: string;
    name: string;
    placeholder: string;
  };
  autocompleteField: {
    searchCallback: (v: string) => Promise<IOption[]>;
    label: string;
    name: string;
    placeholder: string;
  };
}

export const getCurrencyAndAmountFields = (fields: ICurrencyAndAmountField[]) => {
  return fields.map((field) => (
    <Row key={field.name} gutter={12}>
      <Col span={12}>
        <Form.Item
          name={[field.name, field.numberField.name]}
          label={field.numberField.label}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <InputNumber
            min={0}
            placeholder={field.numberField.placeholder}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={[field.name, field.autocompleteField.name]}
          label={field.autocompleteField.label}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <AutocompleteCustom
            searchCallback={field.autocompleteField.searchCallback}
            allowClear
            style={{ width: '100%' }}
            placeholder={field.autocompleteField.placeholder}
            showArrow={false}
            filterOption={false}
            showSearch
          />
        </Form.Item>
      </Col>
    </Row>
  ));
};

export interface IFormList {
  addBtnText: string;
  formListName: string;
}

export const getFormLists = (lists: IFormList[]) => {
  return lists.map((list) => (
    <FormList
      key={list.formListName}
      addBtnText={list.addBtnText}
      formListName={list.formListName}
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
  ));
};
