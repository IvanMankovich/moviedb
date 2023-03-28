export enum Theme {
  light = 'light',
  dark = 'dark',
}

export interface IUniqueElement {
  _id: string;
}

export interface ICountry extends IUniqueElement {
  countryName: string;
}

export interface IGender extends IUniqueElement {
  genderName: string;
}

export interface IPosition extends IUniqueElement {
  positionName: string;
}

export interface IPerson extends IUniqueElement {
  personName: string;
}

export interface IFilmRating extends IUniqueElement {
  filmRatingName: string;
}

export interface IGenre extends IUniqueElement {
  genreName: string;
}

export interface IProductionStage extends IUniqueElement {
  productionStageName: string;
}

export interface ILanguage extends IUniqueElement {
  languageName: string;
}

export interface ICurrency extends IUniqueElement {
  currencySymbol: string;
}
