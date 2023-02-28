import React, { ReactNode } from 'react';

import './Modal.scss';

export interface IModal {
  title?: string;
  content?: ReactNode | ReactNode[];
  actionBar?: ReactNode[];
}

export const Modal = ({ title, content, actionBar }: IModal) => {
  return (
    <div className='modal'>
      {title ? (
        <header className='modal-header'>
          <p>{title}</p>
        </header>
      ) : null}
      {content ? <div className='modal-content'>{content}</div> : null}
      {actionBar ? <footer className='modal-bar'>{actionBar}</footer> : null}
    </div>
  );
};
