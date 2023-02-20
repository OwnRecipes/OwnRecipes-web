export interface PaginationProps {
  limit:  number;
  offset: number;
  count:  number;
}

export interface DefaultFilterProps extends PaginationProps {
  ordering: string;
}

const defaultFilters: Partial<DefaultFilterProps> = {
  limit: 12,
  ordering: '-pub_date',
};

export default defaultFilters;
