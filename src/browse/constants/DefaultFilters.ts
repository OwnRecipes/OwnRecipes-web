export type PaginationProps = {
  limit:  number;
  offset: number;
  count:  number;
}

export type DefaultFilterProps = {
  ordering: string;
} & PaginationProps;

const defaultFilters: Partial<DefaultFilterProps> = {
  limit: 12,
  ordering: '-pub_date',
};

export default defaultFilters;
