import { Prisma } from '@prisma/client';

import {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_PER_PAGE,
} from '../constants/pagination.constants';
import { ParamsArgs } from '../types/query.types';

export const buildQueryOptions = (args: ParamsArgs, defaultSortField = 'createdAt') => {
  const page = args.page ?? PAGINATION_DEFAULT_PAGE;
  const perPage = args.perPage ?? PAGINATION_DEFAULT_PER_PAGE;
  const skip = (page - 1) * perPage;

  const sortBy = args.sortBy
    ? {
        [args.sortBy]: args.sortOrder || Prisma.SortOrder.asc,
      }
    : { [defaultSortField]: Prisma.SortOrder.desc };

  return {
    sortBy,
    page,
    skip,
    perPage,
  };
};
