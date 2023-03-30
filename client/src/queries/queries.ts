import axios from 'axios';
import {
  ICountry,
  ICurrency,
  IFilmRating,
  IGenre,
  ILanguage,
  IPerson,
  IPosition,
  IProductionStage,
} from '../types/types';

export const getPerson = (id?: string) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/people/${id}`);
};

export const getPeople = (q: string) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/people${q ? `?${q}` : ''}`);
};

export const getMovie = (id?: string) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/movies/${id}`);
};

export const peopleRequest = async (value: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/people?qStr=${value}&qFields=personName&pg=1&sortField=personName&sortDir=1`,
  );
  return response.data.data.map((i: IPerson) => ({
    value: i._id,
    label: i.personName,
  }));
};

export const positionsRequest = async (value: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/positions?qStr=${value}&qFields=positionName&pg=1&sortField=positionName&sortDir=1`,
  );
  return response.data.data.map((i: IPosition) => ({
    value: i._id,
    label: i.positionName,
  }));
};

export const genresRequest = async (value: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/genres?qStr=${value}&qFields=genreName&pg=1&sortField=genreName&sortDir=1`,
  );
  return response.data.data.map((i: IGenre) => ({
    value: i._id,
    label: i.genreName,
  }));
};

export const countriesRequest = async (value: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/countries?qStr=${value}&qFields=countryName&pg=1&sortField=countryName&sortDir=1`,
  );
  return response.data.data.map((i: ICountry) => ({
    value: i._id,
    label: i.countryName,
  }));
};

export const filmRatingsRequest = async (value: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/film-ratings?qStr=${value}&qFields=filmRatingName&pg=1&sortField=filmRatingName&sortDir=1`,
  );
  return response.data.data.map((i: IFilmRating) => ({
    value: i._id,
    label: i.filmRatingName,
  }));
};

export const productionStagesRequest = async (value: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/production-stages?qStr=${value}&qFields=productionStageName&pg=1&sortField=productionStageName&sortDir=1`,
  );
  return response.data.data.map((i: IProductionStage) => ({
    value: i._id,
    label: i.productionStageName,
  }));
};

export const languagesRequest = async (value: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/languages?qStr=${value}&qFields=languageName&pg=1&sortField=languageName&sortDir=1`,
  );
  return response.data.data.map((i: ILanguage) => ({
    value: i._id,
    label: i.languageName,
  }));
};

export const currenciesRequest = async (value: string) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/currencies?qStr=${value}&qFields=currencyCode&pg=1&sortField=currencyCode&sortDir=1`,
  );
  return response.data.data.map((i: ICurrency) => ({
    value: i._id,
    label: i.currencySymbol,
  }));
};
