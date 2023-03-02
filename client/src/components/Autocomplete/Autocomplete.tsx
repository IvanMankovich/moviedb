import React, { useState, useEffect, ReactNode } from 'react';
import { getClassName } from '../helpers';
import { ButtonStyle } from '../types';
import { useDebounce } from '../../hooks/useDebounce';

import './Autocomplete.scss';

export interface IOption {
  id: string;
  value: string;
  disabled?: boolean;
}

export interface IAutocomplete {
  id: string;
  options: IOption[];
  fieldName?: string;
  type?: ButtonStyle[];
  startButton?: ReactNode;
  endButton?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onSubmit?: () => void;
  asyncQuery?: (q: string) => Promise<IOption[]>;
}

export const Autocomplete = ({
  id,
  options,
  fieldName,
  type,
  startButton,
  endButton,
  startIcon,
  endIcon,
  onSubmit,
  asyncQuery,
}: IAutocomplete): JSX.Element => {
  const [activeOptionInd, setActiveOptionInd] = useState<number>(0);
  const [filteredOptions, setFilteredOptions] = useState<IOption[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');

  const loadingStateItem: IOption = {
    id: 'loading',
    value: 'Loading...',
    disabled: true,
  };

  const emptyResultsItem = (q: string): IOption => ({
    id: 'empty',
    value: `Not found results for '${q}'`,
    disabled: true,
  });

  const debouncedSearch = useDebounce(userInput.trim(), 500);

  const makeRequest = async (q: string): Promise<void> => {
    setFilteredOptions([loadingStateItem]);

    setShowOptions(true);
    const listItems: IOption[] = [emptyResultsItem(q)];
    const results: IOption[] = [];
    if (asyncQuery) {
      const receivedData = await asyncQuery(q);
      results.push(...receivedData);
    } else {
      const filtered = options.filter(
        (option) => option.value.toLowerCase().indexOf(q.toLowerCase()) > -1,
      );
      results.push(...filtered);
    }
    if (!results?.length) {
      setFilteredOptions(listItems);
    } else {
      setActiveOptionInd(0);
      setFilteredOptions(results);
    }
  };

  useEffect(() => {
    if (debouncedSearch) makeRequest(debouncedSearch);
  }, [debouncedSearch]);

  const onSelectItem = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    setActiveOptionInd(0);
    setShowOptions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onFocus = (): void => {
    makeRequest(userInput);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilteredOptions([loadingStateItem]);
    setUserInput(e.currentTarget.value);
    if (!e.currentTarget.value) {
      makeRequest(e.currentTarget.value);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setActiveOptionInd(0);
      setShowOptions(false);
      setUserInput(filteredOptions[activeOptionInd].value);
    } else if (e.key === 'ArrowUp') {
      if (activeOptionInd === 0) {
        return;
      }
      setActiveOptionInd(activeOptionInd - 1);
    } else if (e.key === 'ArrowDown') {
      if (activeOptionInd - 1 === filteredOptions.length) {
        return;
      }
      setActiveOptionInd(activeOptionInd + 1);
    }
  };

  return (
    <div
      className={`autocomplete-wrapper${
        type?.length ? getClassName('autocomplete-wrapper', type) : ''
      }`}
    >
      {fieldName ? (
        <label className='autocomplete__label' htmlFor={id}>
          {fieldName}
        </label>
      ) : null}
      <input
        className='autocomplete'
        type='text'
        id={id}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onSubmit={onSubmit}
        onFocus={onFocus}
        value={userInput}
      />
      {startIcon ? <div className='autocomplete__icon_pos-start'>{startIcon}</div> : null}
      {endIcon ? <div className='autocomplete__icon_pos-end'>{endIcon}</div> : null}
      {startButton ? <div className='autocomplete__btn_pos-start'>{startButton}</div> : null}
      {endButton ? <div className='autocomplete__btn_pos-end'>{endButton}</div> : null}
      {showOptions ? (
        <ul className='options-list'>
          {filteredOptions.map((option, index) => {
            return (
              <li
                className={index === activeOptionInd ? 'option_active' : ''}
                key={option.id}
                onClick={onSelectItem}
              >
                {option.value}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
