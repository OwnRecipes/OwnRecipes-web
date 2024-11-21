/* eslint-disable func-names */

import { CategoryCount, RatingCount } from '../../browse/store/FilterTypes';
import { CourseDto, CuisineDto, RecipeDto, SeasonDto, TagDto } from '../../recipe/store/RecipeTypes';
import { demoCourses } from './courses';
import { demoCuisines } from './cuisines';
import { demoRecipes } from './recipe';
import { demoGetAllSeasons } from './seasons';
import { demoFindSearchRecipes } from './search';
import { demoGetAllTags } from './tags';
import { ObjectIterator, toQueryParams } from './utils';

export const ratingCountConfig = {
  pattern: '(.*)/rating/rating-count/(.*)',
  fixtures: function (match: Array<string>) {
    // console.log(`fixtures running for ratingCountConfig. match=${JSON.stringify(match)}`);

    if (match.length < 3) return {};
    const queryParams: URLSearchParams = toQueryParams(match[2]);

    const resultRecipes: Array<RecipeDto> = demoFindSearchRecipes(demoRecipes, queryParams);

    const result: Array<RatingCount> = [];
    const allRatings = [0, 1, 2, 3, 4 ,5];
    allRatings.forEach(r => {
      result.push({
        rating: r,
        total:  resultRecipes.filter(rec => rec.rating === r).length,
      });
    });

    return {
      results: result,
    };
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export const courseCountConfig = {
  pattern: '(.*)/recipe_groups/course-count/(.*)',
  fixtures: function (match: Array<string>) {
    // console.log(`fixtures running for courseCountConfig. match=${JSON.stringify(match)}`);

    if (match.length < 3) return {};
    const queryParams: URLSearchParams = toQueryParams(match[2]);
    const resultRecipes: Array<RecipeDto> = demoFindSearchRecipes(demoRecipes, queryParams);

    const allCourses: Array<CourseDto> = demoCourses;

    const courseCounts: Array<CategoryCount> = [];
    allCourses.forEach(c => {
      courseCounts.push({
        id:    c.id,
        total: resultRecipes.filter(rec => rec.course?.title === c.title).length,
        title: c.title,
        slug:  c.title,
      });
    });

    const result: ObjectIterator<CategoryCount> = {
      count:    courseCounts.length,
      next:     null,
      previous: null,
      results:  courseCounts,
    };

    return result;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export const cuisineCountConfig = {
  pattern: '(.*)/recipe_groups/cuisine-count/(.*)',
  fixtures: function (match: Array<string>) {
    // console.log(`fixtures running for cuisineCountConfig. match=${JSON.stringify(match)}`);

    if (match.length < 3) return {};
    const queryParams: URLSearchParams = toQueryParams(match[2]);
    const resultRecipes: Array<RecipeDto> = demoFindSearchRecipes(demoRecipes, queryParams);

    const allCuisines: Array<CuisineDto> = demoCuisines;

    const cuisineCounts: Array<CategoryCount> = [];
    allCuisines.forEach(c => {
      cuisineCounts.push({
        id:    c.id,
        total: resultRecipes.filter(rec => rec.cuisine?.title === c.title).length,
        title: c.title,
        slug:  c.title,
      });
    });

    const result: ObjectIterator<CategoryCount> = {
      count:    cuisineCounts.length,
      next:     null,
      previous: null,
      results:  cuisineCounts,
    };

    return result;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export const seasonCountConfig = {
  pattern: '(.*)/recipe_groups/season-count/(.*)',
  fixtures: function (match: Array<string>) {
    // console.log(`fixtures running for seasonCountConfig. match=${JSON.stringify(match)}`);

    if (match.length < 3) return {};
    const queryParams: URLSearchParams = toQueryParams(match[2]);
    const resultRecipes: Array<RecipeDto> = demoFindSearchRecipes(demoRecipes, queryParams);

    const allSeasons: Array<SeasonDto> = demoGetAllSeasons(demoRecipes);

    const seasonCounts: Array<CategoryCount> = [];
    allSeasons.forEach(s => {
      seasonCounts.push({
        id:    s.id,
        total: resultRecipes.filter(rec => rec.seasons.map(recS => recS.title).includes(s.title)).length,
        title: s.title,
        slug:  s.title,
      });
    });

    const result: ObjectIterator<CategoryCount> = {
      count:    seasonCounts.length,
      next:     null,
      previous: null,
      results:  seasonCounts,
    };

    return result;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};

export const tagCountConfig = {
  pattern: '(.*)/recipe_groups/tag-count/(.*)',
  fixtures: function (match: Array<string>) {
    // console.log(`fixtures running for tagCountConfig. match=${JSON.stringify(match)}`);

    if (match.length < 3) return {};
    const queryParams: URLSearchParams = toQueryParams(match[2]);
    const resultRecipes: Array<RecipeDto> = demoFindSearchRecipes(demoRecipes, queryParams);

    const allTags: Array<TagDto> = demoGetAllTags(demoRecipes);

    const tagCounts: Array<CategoryCount> = [];
    allTags.forEach(t => {
      tagCounts.push({
        id:    t.id,
        total: resultRecipes.filter(rec => rec.tags.map(recT => recT.title).includes(t.title)).length,
        title: t.title,
        slug:  t.title,
      });
    });

    const result: ObjectIterator<CategoryCount> = {
      count:    tagCounts.length,
      next:     null,
      previous: null,
      results:  tagCounts,
    };

    return result;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
};
