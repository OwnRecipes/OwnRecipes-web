/* eslint-disable func-names */

import { RecipeDto, RecipeListDto } from '../../recipe/store/RecipeTypes';
import { demoRecipes, toRecipeListDto } from './recipe';
import { demoFindSearchRecipes } from './search';
import { ObjectIterator, randomInt, toQueryParams } from './utils';

const config = {
  pattern: '(.*)/recipe/mini-browse/(.*)',
  fixtures: function (match: Array<string>) {
    // console.log(`fixtures running for miniBrowse. match=${JSON.stringify(match)}`);

    if (match.length < 3) return {};
    const queryParams: URLSearchParams = toQueryParams(match[2]);
    let limit = parseInt(queryParams.get('limit') ?? '1');
    if (Number.isNaN(limit)) {
      limit = 1;
    }
    limit = Math.max(limit, 1);
    queryParams.delete('limit');

    const searchRecipes = demoFindSearchRecipes(demoRecipes, queryParams);
    limit = Math.min(limit, searchRecipes.length);

    const resultSlugs: Array<string> = [];
    const resultRecipes: Array<RecipeDto> = [];
    if (limit > 0) {
      do {
        const randomIndex = randomInt(0, searchRecipes.length);
        const nextRecipe = searchRecipes[randomIndex];
        const nextSlug = searchRecipes[randomIndex].slug;
        if (!resultSlugs.includes(nextSlug)) {
          resultSlugs.push(nextSlug);
          resultRecipes.push(nextRecipe);
        }
      } while (resultSlugs.length < limit);
    }

    const result: ObjectIterator<RecipeListDto> = {
      count: resultRecipes.length,
      next: null,
      previous: null,
      results: resultRecipes.map(toRecipeListDto),
    };

    return result;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export default config;
