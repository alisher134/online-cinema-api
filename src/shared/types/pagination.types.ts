export type PaginationArgs = {
  page?: number;
  perPage?: number;
};

export type PaginationMeta = {
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: PaginationMeta;
};
