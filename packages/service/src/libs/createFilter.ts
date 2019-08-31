import { Model, QueryBuilder } from 'objection';

export type FilterConfig<M extends Model, O> = {
  [P in keyof O]: (scope: QueryBuilder<M>, value: O[P]) => QueryBuilder<M>;
};

export const createFilter = <M extends Model, O extends object>(
  filters: FilterConfig<M, O>,
) => <X extends keyof O>(scope: QueryBuilder<M>, options: O) => {
  return Object.entries(options).reduce(
    (qb, [key, value]) =>
      options.hasOwnProperty(key) ? filters[key as X](qb, value) : qb,
    scope,
  );
};

export const createSortFilter = <M extends Model>() => (
  scope: QueryBuilder<M>,
  sorts: SortConfig<any>,
) => {
  return sorts.reduce(
    (qb, [field, direction]) => qb.orderBy(field, direction),
    scope,
  );
};

export type SimpleSort<T extends string> = [T, 'asc' | 'dsc'];

export type SortConfig<S extends string> = SimpleSort<S>[];
