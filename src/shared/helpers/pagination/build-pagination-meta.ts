import { PaginationMeta } from '@/shared/types/pagination.types';

export const buildMeta = (params: Omit<PaginationMeta, 'totalPages'>) => {
  const { page, perPage, totalRecords } = params;

  return {
    page,
    perPage,
    totalRecords,
    totalPages: Math.ceil(totalRecords / perPage),
  };
};
