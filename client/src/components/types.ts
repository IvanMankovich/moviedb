import { ReactNode } from 'react';

export enum ButtonStyle {
  bordered = 'bordered',
  transparent = 'transparent',
}

export interface IMenuItem {
  label: ReactNode;
  key: string;
  icon?: ReactNode;
  onClick?(): void;
  path?: string;
}
