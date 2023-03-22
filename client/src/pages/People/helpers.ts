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
  'personDoB',
  'personGender',
  'personPlaceOfBirth',
  'personPositions',
  'personDoBfrom',
  'personDoBto',
];
