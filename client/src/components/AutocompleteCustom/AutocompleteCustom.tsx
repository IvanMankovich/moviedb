import React, { useState } from 'react';
import { Select as AtndSelect } from 'antd';
import { SelectProps } from 'antd/es/select';
import { BaseSelectRef } from 'rc-select';
import { valueType } from 'antd/es/statistic/utils';

export interface IOption {
  label: string;
  value: string;
}

export interface ExtendedSelectProps extends SelectProps<valueType> {
  searchCallback?: (v: string) => Promise<IOption[]>;
}

export type IAutocompleteCustom = ExtendedSelectProps & {
  children?: React.ReactNode;
} & {
  ref?: React.Ref<BaseSelectRef> | undefined;
};

export const AutocompleteCustom = ({ searchCallback, ...props }: IAutocompleteCustom) => {
  const [options, setOptions] = useState<IOption[]>([]);

  let timeout: ReturnType<typeof setTimeout> | null;

  const fetch = (value: string, callback: (args: IOption[]) => void) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const makeRequest = async () => {
      const data = await searchCallback?.(value);
      callback(data as IOption[]);
    };

    timeout = setTimeout(makeRequest, 300);
  };

  const handleSearch = async (newValue: string) => {
    if (newValue) {
      fetch(newValue, setOptions);
    } else {
      setOptions([]);
    }
  };

  return <AtndSelect onSearch={handleSearch} options={options} {...props} />;
};
