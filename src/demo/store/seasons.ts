/* eslint-disable func-names */

import { RecipeDto, SeasonDto } from '../../recipe/store/RecipeTypes';
import { demoRecipes } from './recipe';
import { ObjectIterator } from './utils';

export function demoGetAllSeasons(allRecipes: Array<RecipeDto>): Array<SeasonDto> {
  const recipeSeasons = allRecipes.map(rec => rec.seasons ?? []).flat();
  const uniqueSeasonsSlug: Array<string> = [];
  const uniqueSeasons: Array<SeasonDto> = [];
  recipeSeasons.forEach(s => {
    if (!uniqueSeasonsSlug.includes(s.title)) {
      uniqueSeasonsSlug.push(s.title);
      uniqueSeasons.push(s);
    }
  });

  return uniqueSeasons;
}

const config = {
  pattern: '(.*)/recipe_groups/season/(.*)',
  fixtures: function () {
    // console.log('fixtures running for seasons.');

    const uniqueSeasons: Array<SeasonDto> = demoGetAllSeasons(demoRecipes);

    const seasonsIterator: ObjectIterator<SeasonDto> = {
      count:    uniqueSeasons.length,
      next:     null,
      previous: null,
      results:  uniqueSeasons,
    };

    return seasonsIterator;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export default config;
