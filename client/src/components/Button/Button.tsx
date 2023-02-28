import React from 'react';
import { ReactNode } from 'react';
import './Button.scss';

export enum ButtonStyle {
  bordered = 'bordered',
  transparent = 'transparent',
}

export interface IButton {
  content: ReactNode;
  onClickHandler?(): void;
  type?: ButtonStyle[];
}

export const Button = ({ content, onClickHandler, type }: IButton) => {
  const classname: string = type?.length ? type.map((type: string) => `btn_${type}`).join(' ') : '';
  return (
    <button className={`btn ${classname}`} onClick={onClickHandler}>
      {content}
    </button>
  );
};
