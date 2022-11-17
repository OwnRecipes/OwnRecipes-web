import classNames from 'classnames';
import { useMemo } from 'react';

import { toNumberDefault } from '../../common/utility';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { PaginationProps } from '../constants/DefaultFilters';
import { SearchResult } from '../store/SearchTypes';
import ListRecipes from './ListRecipes';
import Pagination from './Pagination';

export interface IResultsProps {
  pending:  boolean;
  search:   SearchResult;
  qs:       Record<string, string>;
  defaults: Partial<PaginationProps>;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
  onOpenRecipe: (rec: RecipeList) => void;
}

const Results: React.FC<IResultsProps> = ({ pending, search, qs, defaults, buildUrl, onOpenRecipe }: IResultsProps) => {
  const listJsx = useMemo(() => (
    <ListRecipes
        data = {search.recipes}
        onOpenRecipe = {onOpenRecipe} />
  ), [search.recipes, onOpenRecipe]);

  const paginationJsx = useMemo(() => (
    <Pagination
        limit    = {toNumberDefault(qs.limit, defaults.limit ?? 12)}
        count    = {search.totalRecipes}
        offset   = {toNumberDefault(qs.offset, defaults.offset ?? 0)}
        buildUrl = {buildUrl} />
  ), [search.totalRecipes, qs, defaults, buildUrl, onOpenRecipe]);

  return (
    <div className={classNames('results-container', { pending: pending })}>
      {listJsx}
      {paginationJsx}
    </div>
  );
};

export default Results;
