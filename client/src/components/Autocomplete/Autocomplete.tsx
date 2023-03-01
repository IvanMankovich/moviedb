import React, { useState, ReactNode } from 'react';
import { getClassName } from '../helpers';
import { ButtonStyle } from '../types';

import './Autocomplete.scss';

export interface IAutocomplete {
  id: string;
  options: string[];
  fieldName?: string;
  type?: ButtonStyle[];
}

export const Autocomplete = ({ id, options, fieldName, type }: IAutocomplete): JSX.Element => {
  const [activeOption, setActiveOption] = useState<number>(0);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const userInput = e.currentTarget.value;
    const filtered = options.filter(
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    );

    setActiveOption(0);
    setFilteredOptions(filtered);
    setShowOptions(true);
    setUserInput(e.currentTarget.value);
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    setActiveOption(0);
    setFilteredOptions([]);
    setShowOptions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setActiveOption(0);
      setShowOptions(false);
      setUserInput(filteredOptions[activeOption]);
    } else if (e.key === 'ArrowUp') {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(activeOption - 1);
    } else if (e.key === 'ArrowDown') {
      if (activeOption - 1 === filteredOptions.length) {
        return;
      }
      setActiveOption(activeOption + 1);
    }
  };

  let optionsListComponent: ReactNode | null = null;

  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionsListComponent = (
        <ul className='options-list'>
          {filteredOptions.map((option, index) => {
            let className;

            if (index === activeOption) {
              className = 'option_active';
            }

            return (
              <li className={className} key={option} onClick={onClick}>
                {option}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionsListComponent = null;
    }
  }

  return (
    <div
      className={`autocomplete-wrapper ${type?.length ? getClassName('autocomplete', type) : ''}`}
    >
      {fieldName ? <label htmlFor={id}>{fieldName}</label> : null}
      <input
        className='autocomplete'
        type='text'
        id={id}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {optionsListComponent}
    </div>
  );
};
