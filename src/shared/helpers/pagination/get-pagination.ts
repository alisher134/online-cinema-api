import {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_PER_PAGE,
} from '../../constants/pagination.constants';
import { PaginationArgs } from '../../types/pagination.types';

export const getPagination = (dto: PaginationArgs) => {
  const page = dto.page ?? PAGINATION_DEFAULT_PAGE;
  const perPage = dto.perPage ?? PAGINATION_DEFAULT_PER_PAGE;
  const skip = (page - 1) * perPage;

  return { page, skip, perPage };
};
