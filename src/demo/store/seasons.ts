/* eslint-disable func-names */

import { SeasonDto } from '../../recipe/store/RecipeTypes';
import { ObjectIterator } from './utils';

/* eslint-disable quotes, quote-props, comma-dangle */
export const demoSeasons: Array<SeasonDto> = [
  {
    "id": 1,
    "title": "Spring",
  },
  {
    "id": 2,
    "title": "Summer",
  },
  {
    "id": 3,
    "title": "Autumn",
  },
  {
    "id": 4,
    "title": "Winter",
  },
];
/* eslint-enable quotes, quote-props, comma-dangle */

const config = {
  pattern: '(.*)/recipe_groups/season/',
  fixtures: function () {
    // console.log(`fixtures running for seasons.`);

    const result: ObjectIterator<SeasonDto> = {
      count:    demoSeasons.length,
      next:     null,
      previous: null,
      results:  demoSeasons,
    };

    return result;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export default config;
