/* eslint-disable func-names */

import { RecipeDto, RecipeListDto } from '../../recipe/store/RecipeTypes';
import { demoRecipes, toRecipeListDto } from './recipe';
import { ObjectIterator, toQueryParams } from './utils';

function demoFilterRating(resultRecipes: Array<RecipeDto>, queryParams: URLSearchParams): Array<RecipeDto> {
  if (queryParams.has('rating')) {
    const queryRatings = queryParams.get('rating')?.split(',');
    return resultRecipes.filter(r => queryRatings?.includes(String(r.rating)));
  }
  return resultRecipes;
}

function demoDoFilterByCourse(resultRecipes: Array<RecipeDto>, courses: Array<string>): Array<RecipeDto> {
  return resultRecipes.filter(r => r.course && courses?.includes(r.course.title.toLocaleLowerCase()));
}
function demoFilterCourse(resultRecipes: Array<RecipeDto>, queryParams: URLSearchParams): Array<RecipeDto> {
  if (queryParams.has('course')) {
    const queryCourses = queryParams.get('course')?.split(',').map(c => c.toLocaleLowerCase());
    return demoDoFilterByCourse(resultRecipes, queryCourses ?? []);
  }
  if (queryParams.has('course__slug')) {
    const queryCourses = queryParams.get('course__slug')?.split(',').map(c => c.toLocaleLowerCase());
    return demoDoFilterByCourse(resultRecipes, queryCourses ?? []);
  }
  return resultRecipes;
}

function demoDoFilterByCuisine(resultRecipes: Array<RecipeDto>, cuisines: Array<string>): Array<RecipeDto> {
  return resultRecipes.filter(r => r.cuisine && cuisines?.includes(r.cuisine.title.toLocaleLowerCase()));
}
function demoFilterCuisine(resultRecipes: Array<RecipeDto>, queryParams: URLSearchParams): Array<RecipeDto> {
  if (queryParams.has('cuisine')) {
    const queryCuisines = queryParams.get('cuisine')?.split(',').map(c => c.toLocaleLowerCase());
    return demoDoFilterByCuisine(resultRecipes, queryCuisines ?? []);
  }
  if (queryParams.has('cuisine__slug')) {
    const queryCuisines = queryParams.get('cuisine__slug')?.split(',').map(c => c.toLocaleLowerCase());
    return demoDoFilterByCuisine(resultRecipes, queryCuisines ?? []);
  }
  return resultRecipes;
}

function demoDoFilterByTag(resultRecipes: Array<RecipeDto>, tags: Array<string>): Array<RecipeDto> {
  return resultRecipes.filter(r => r.tags.find(t => tags?.includes(t.title.toLocaleLowerCase())));
}
function demoFilterTag(resultRecipes: Array<RecipeDto>, queryParams: URLSearchParams): Array<RecipeDto> {
  if (queryParams.has('tag')) {
    const queryTags = queryParams.get('tag')?.split(',').map(c => c.toLocaleLowerCase());
    return demoDoFilterByTag(resultRecipes, queryTags ?? []);
  }
  if (queryParams.has('tag__slug')) {
    const queryTags = queryParams.get('tag__slug')?.split(',').map(c => c.toLocaleLowerCase());
    return demoDoFilterByTag(resultRecipes, queryTags ?? []);
  }
  return resultRecipes;
}

function demoDoFilterByAuthor(resultRecipes: Array<RecipeDto>, authors: Array<string>): Array<RecipeDto> {
  const authorsS = `,${authors.map(a => a.toLocaleLowerCase()).join(',')},`;
  return resultRecipes.filter(r => authorsS.includes(r.pub_username.toLocaleLowerCase()));
}
function demoFilterAuthor(resultRecipes: Array<RecipeDto>, queryParams: URLSearchParams): Array<RecipeDto> {
  if (queryParams.has('author')) {
    const queryAuthor = queryParams.get('author')?.split(',').map(c => c.toLocaleLowerCase());
    return demoDoFilterByAuthor(resultRecipes, queryAuthor ?? []);
  }
  if (queryParams.has('author__username')) {
    const queryAuthor = queryParams.get('author__username')?.split(',').map(c => c.toLocaleLowerCase());
    return demoDoFilterByAuthor(resultRecipes, queryAuthor ?? []);
  }
  return resultRecipes;
}

function demoDoFilterByTitle(resultRecipes: Array<RecipeDto>, titles: Array<string>): Array<RecipeDto> {
  return resultRecipes.filter(r => {
    const rTitle = r.title.toLocaleLowerCase();
    for (let ix = 0; ix < titles.length; ++ix) {
      const nextTitle = titles[ix];
      if (!rTitle.includes(nextTitle.toLocaleLowerCase())) {
        return false;
      }
    }
    return true;
  });
}

function demoDoFilterByIngredient(resultRecipes: Array<RecipeDto>, ingredients: Array<string>): Array<RecipeDto> {
  return resultRecipes.filter(r => {
    const allIngredients: Array<string> = r.ingredient_groups.flatMap(grp => grp.ingredients.flatMap(ingr => ingr.title.toLocaleLowerCase()));

    for (let ix = 0; ix < ingredients.length; ++ix) {
      const nextIngredient = ingredients[ix];
      if (!allIngredients.find(i => i.includes(nextIngredient.toLocaleLowerCase()))) {
        return false;
      }
    }

    return true;
  });
}

function demoFilterSearch(resultRecipes: Array<RecipeDto>, queryParams: URLSearchParams): Array<RecipeDto> {
  if (queryParams.has('search')) {
    const querySearches = queryParams.get('search')?.split(' ').map(c => c.toLocaleLowerCase());
    const resultRecipess: Set<RecipeDto> = new Set();

    demoDoFilterByCuisine(resultRecipes, querySearches ?? []).forEach(r => resultRecipess.add(r));
    demoDoFilterByCourse(resultRecipes, querySearches ?? []).forEach(r => resultRecipess.add(r));
    demoDoFilterByTag(resultRecipes, querySearches ?? []).forEach(r => resultRecipess.add(r));
    demoDoFilterByAuthor(resultRecipes, querySearches ?? []).forEach(r => resultRecipess.add(r));
    demoDoFilterByTitle(resultRecipes, querySearches ?? []).forEach(r => resultRecipess.add(r));
    demoDoFilterByIngredient(resultRecipes, querySearches ?? []).forEach(r => resultRecipess.add(r));

    return Array.from(resultRecipess);
  }
  return resultRecipes;
}

function demoLimit(resultRecipes: Array<RecipeDto>, queryParams: URLSearchParams): Array<RecipeDto> {
  if (queryParams.has('limit')) {
    let offset = parseInt(queryParams.get('offset') ?? '0');
    if (Number.isNaN(offset) || offset < 0) {
      offset = 0;
    }

    let limit = parseInt(queryParams.get('limit') ?? '1');
    if (Number.isNaN(limit)) {
      limit = 1;
    }
    limit = Math.max(limit, 1);
    limit = Math.min(limit, resultRecipes.length);

    const res = resultRecipes.slice(offset, offset + limit);
    return res;
  }
  return resultRecipes;
}

function demoOrdering(resultRecipes: Array<RecipeDto>, queryParams: URLSearchParams): Array<RecipeDto> {
  const orderBy = (queryParams.get('ordering') ?? '-pub_date').toLocaleLowerCase();
  switch (orderBy) {
    case 'title':
      return resultRecipes.sort((a, b) => a.title.localeCompare(b.title));
    case '-rating':
      return resultRecipes.sort((a, b) => b.rating - a.rating);
    default:
      // -pub_date
      return resultRecipes.sort((a, b) => -a.pub_date.localeCompare(b.pub_date));
  }
}

export function demoFindSearchRecipes(allRecipes: Array<RecipeDto>, queryParams: URLSearchParams): Array<RecipeDto> {
  let resultRecipes: Array<RecipeDto> = [...allRecipes];

  resultRecipes = demoFilterRating(resultRecipes, queryParams);
  resultRecipes = demoFilterCuisine(resultRecipes, queryParams);
  resultRecipes = demoFilterCourse(resultRecipes, queryParams);
  resultRecipes = demoFilterTag(resultRecipes, queryParams);
  resultRecipes = demoFilterAuthor(resultRecipes, queryParams);
  resultRecipes = demoFilterSearch(resultRecipes, queryParams);

  resultRecipes = demoOrdering(resultRecipes, queryParams);

  return resultRecipes;
}

const config = {
  pattern: '(.*)/recipe/recipes/?(.*)',
  fixtures: function (match: Array<string>) {
    // console.log(`fixtures running for search. match=${JSON.stringify(match)}`);

    if (match.length < 3) return {};
    const queryParams: URLSearchParams = toQueryParams(match[2]);

    const resultRecipes = demoFindSearchRecipes(demoRecipes, queryParams);
    const limitedResultRecipes = demoLimit(resultRecipes, queryParams);

    const result: ObjectIterator<RecipeListDto> = {
      count: resultRecipes.length,
      next: null,
      previous: null,
      results: limitedResultRecipes.map(rec => toRecipeListDto(rec)),
    };

    return result;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export default config;
