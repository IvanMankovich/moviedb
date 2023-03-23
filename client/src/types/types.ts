export enum Theme {
  light = 'light',
  dark = 'dark',
}

export interface ICountry {
  _id: string;
  countryName: string;
}

export interface IGender {
  _id: string;
  genderName: string;
}

export interface IPosition {
  _id: string;
  positionName: string;
}
