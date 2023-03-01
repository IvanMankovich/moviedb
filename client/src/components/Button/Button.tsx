import React, { ReactNode } from 'react';
import { getClassName } from '../helpers';

import { ButtonStyle } from '../types';

import './Button.scss';

export interface IButton {
  content: ReactNode;
  onClickHandler?(): void;
  type?: ButtonStyle[];
}

export const Button = ({ content, onClickHandler, type }: IButton) => {
  return (
    <button
      className={`btn${type?.length ? getClassName('btn', type) : ''}`}
      onClick={onClickHandler}
    >
      {content}
    </button>
  );
};
