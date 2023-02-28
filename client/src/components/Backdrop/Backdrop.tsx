import React, { ReactNode, useRef } from 'react';

import './Backdrop.scss';

export interface IBackdrop {
  content: ReactNode;
}

export const Backdrop = ({ content }: IBackdrop): JSX.Element => {
  const backdropRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className='backdrop'
      ref={backdropRef}
      onClick={(_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(_event);
      }}
    >
      {content}
    </div>
  );
};
