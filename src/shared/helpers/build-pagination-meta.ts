import { PaginationMeta } from '../types/query.types';

export const buildPaginationMeta = (params: PaginationMeta) => {
  const { page, perPage, totalRecords } = params;

  return {
    page,
    perPage,
    totalRecords,
    totalPages: Math.ceil(totalRecords / perPage),
  };
};
