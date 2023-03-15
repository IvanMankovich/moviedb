export interface IQuery {
  qStr?: string;
  qFields?: string | string[];
  limit?: string;
  pg?: string;
  sortField?: string;
  sortDir?: '1' | '-1';
}
