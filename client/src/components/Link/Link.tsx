import React from 'react';
import './Link.scss';

export interface ILink {
  href: string;
  title: string;
  text: string;
}

export const Link = ({ href, title, text }: ILink): JSX.Element => {
  return (
    <a href={href} title={title}>
      {text}
    </a>
  );
};
