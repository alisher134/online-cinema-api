import { ParamsArgs } from '../types/query.types';

export const buildFilter = (args: ParamsArgs, mode: 'AND' | 'OR' = 'AND') => {
  const filterQuery = args.filter?.length
    ? {
        [mode]: args.filter?.map((item) => {
          if (Array.isArray(item.value)) {
            return {
              [item.field]: {
                in: item.value,
              },
            };
          }
          return {
            [item.field]: {
              contains: item.value,
              mode: 'insensitive',
            },
          };
        }),
      }
    : {};

  const where = { ...filterQuery };

  return { where };
};
