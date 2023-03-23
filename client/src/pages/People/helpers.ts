import dayjs from 'dayjs';
import { ISearchPersonFormData } from '../../modules/PersonSearchForm/PersonSearchForm';

export interface IQueryObject {
  [x: string]: string;
}

export function parseFormToQuery<T>(values: T) {
  const params: string[] = [];
  for (const key in values) {
    const tempValue = values[key as keyof typeof values];
    if (tempValue) {
      params.push(`${key}=${tempValue}`);
    }
  }
  return params;
}

export const getQueryString = (params: string[], urlSearchParams: URLSearchParams) => {
  return params
    .reduce((acc: string[], param: string) => {
      return urlSearchParams.get(param) ? [...acc, `${param}=${urlSearchParams.get(param)}`] : acc;
    }, [])
    .join('&');
};

export const searchFields = [
  'qStr',
  'personGender',
  'personPlaceOfBirth',
  'personPositions',
  'personDoBfrom',
  'personDoBto',
];

export class FormField {
  propName;

  constructor(propName: string) {
    this.propName = propName;
  }

  getValue(value: string | null): null | string | string[] | dayjs.Dayjs {
    if (value) {
      return value;
    }
    return null;
  }
}

export class FormFieldArrayOfString extends FormField {
  constructor(propName: string) {
    super(propName);
  }

  getValue(value: string | null) {
    if (value) {
      return value.split(',');
    }
    return null;
  }
}

export class FormFieldDate extends FormField {
  getValue(value: string | null) {
    if (value) {
      return dayjs(value);
    }
    return null;
  }
}

export interface IFormField {
  fieldName: string;
  fieldType: FormFieldDate | FormField | FormFieldArrayOfString;
}

export const formFields: IFormField[] = [
  { fieldName: 'qStr', fieldType: new FormField('qStr') },
  { fieldName: 'personGender', fieldType: new FormField('personGender') },
  { fieldName: 'personPlaceOfBirth', fieldType: new FormField('personPlaceOfBirth') },
  { fieldName: 'personPositions', fieldType: new FormFieldArrayOfString('personPositions') },
  { fieldName: 'personDoBfrom', fieldType: new FormFieldDate('personDoBfrom') },
  { fieldName: 'personDoBto', fieldType: new FormFieldDate('personDoBto') },
];

export const parseQueryToForm = (params: IFormField[], urlSearchParams: URLSearchParams) => {
  return params.reduce((acc: ISearchPersonFormData, param: IFormField) => {
    return urlSearchParams.get(param.fieldName)
      ? {
          ...acc,
          [param.fieldName]: param.fieldType.getValue(urlSearchParams.get(param.fieldName)),
        }
      : acc;
  }, {});
};
