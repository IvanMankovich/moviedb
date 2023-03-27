import React from 'react';
import { Button, Form, FormItemProps, Space } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

export interface IFormList {
  formListName: string;
  formItems: FormItemProps[];
  addBtnText: string;
}

export const FormList = ({ formListName, formItems, addBtnText }: IFormList) => {
  return (
    <Form.List name={formListName}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              align='baseline'
            >
              {formItems.map((i) => (
                <Form.Item
                  key={i.name as string}
                  {...restField}
                  {...i}
                  name={[name, i.name as string]}
                ></Form.Item>
              ))}
              <MinusOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
              {addBtnText}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
