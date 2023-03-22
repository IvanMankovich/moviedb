export interface IQuery {
  qStr?: string;
  qFields?: string | string[];
  limit?: string;
  pg?: string;
  sortField?: string;
  sortDir?: '1' | '-1';
}

export interface IPeopleQuery extends IQuery {
  personDoB?: string;
  personGender?: string;
  personPlaceOfBirth?: string;
  personPositions?: string;
  personDoBfrom?: Date;
  personDoBto?: Date;
}
