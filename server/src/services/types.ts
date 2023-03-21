export interface IQuery {
  qStr?: string;
  qFields?: string | string[];
  limit?: string;
  pg?: string;
  sortField?: string;
  sortDir?: '1' | '-1';
}

export interface IPeopleQuery {
  personDoB?: string;
  personGender?: string;
  personName?: string;
  personPlaceOfBirth?: string;
  personPositions?: string | string[];
  limit?: string;
  pg?: string;
  sortField?: string;
  sortDir?: '1' | '-1';
}
