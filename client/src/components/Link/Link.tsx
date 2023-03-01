import React, { ReactNode } from 'react';
import './Link.scss';

export interface ILink {
  href: string;
  title: string;
  text?: string;
  children: ReactNode;
}

export const Link = ({ href, title, text, children }: ILink): JSX.Element => {
  return (
    <a href={href} title={title}>
      {text ? text : null}
      {children}
    </a>
  );
};
