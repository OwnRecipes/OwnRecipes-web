/* eslint-disable func-names */

import { RecipeDto, TagDto } from '../../recipe/store/RecipeTypes';
import { demoRecipes } from './recipe';
import { ObjectIterator } from './utils';

export function demoGetAllTags(allRecipes: Array<RecipeDto>): Array<TagDto> {
  const recipeTags = allRecipes.map(rec => rec.tags ?? []).flat();
  const uniqueTagsSlug: Array<string> = [];
  const uniqueTags: Array<TagDto> = [];
  recipeTags.forEach(t => {
    if (!uniqueTagsSlug.includes(t.title)) {
      uniqueTagsSlug.push(t.title);
      uniqueTags.push(t);
    }
  });

  return uniqueTags;
}

const config = {
  pattern: '(.*)/recipe_groups/tag/(.*)',
  fixtures: function () {
    // console.log('fixtures running for tags.');

    const uniqueTags: Array<TagDto> = demoGetAllTags(demoRecipes);

    const tagsIterator: ObjectIterator<TagDto> = {
      count:    uniqueTags.length,
      next:     null,
      previous: null,
      results:  uniqueTags,
    };

    return tagsIterator;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export default config;
