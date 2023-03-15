import React, { useState } from 'react';
import { Form, Select as AtndSelect } from 'antd';
import axios from 'axios';

export interface ISelect {
  mode?: 'multiple' | 'tags';
  placeholder?: string;
}

export interface IOption {
  label: string;
  value: string;
}

export const AutocompleteCustom = (props: any) => {
  const [posOpts, setPosOpts] = useState<IOption[]>([]);
  const { status } = Form.Item.useStatus();

  let timeout: ReturnType<typeof setTimeout> | null;

  const fetch = (value: string, callback: (...args: any[]) => void) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const fake = async () => {
      const response = await axios.get(
        `http://localhost:4000/positions?qStr=${value}&qFields=personPosition&pg=1&sortField=personPosition&sortDir=1`,
      );
      const data = response.data.data.map((i: { _id: string; personPosition: string }) => ({
        value: i._id,
        label: i.personPosition,
      }));
      console.log(data);
      callback(data);
    };

    timeout = setTimeout(fake, 300);
  };

  const handleSearch = async (newValue: string) => {
    if (newValue) {
      fetch(newValue, setPosOpts);
    } else {
      setPosOpts([]);
    }
  };

  return (
    <AtndSelect
      mode='multiple'
      allowClear
      style={{ width: '100%' }}
      placeholder={`Select person's position`}
      onSearch={handleSearch}
      options={posOpts}
      showArrow={false}
      filterOption={false}
      showSearch
      className={`custom-input-${status}`}
      {...props}
    />
  );
};
