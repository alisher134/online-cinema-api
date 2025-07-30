export type ParamsArgs = {
  filter?: Filter[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
};

export type Filter = {
  field: string;
  value: string | string[];
};

export type PaginationMeta = {
  page: number;
  perPage: number;
  totalRecords: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: PaginationMeta;
};
