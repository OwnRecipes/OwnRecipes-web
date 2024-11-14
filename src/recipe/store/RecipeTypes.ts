import { Dispatch as ReduxDispatch } from 'redux';
import * as _ from 'lodash-es';

import { NUMBER_UNDEFINED, STRING_UNDEFINED } from '../../common/constants';
import ItemReducerType from '../../common/store/ItemReducerType';
import { GenericItemReducerAction } from '../../common/store/ReduxHelper';
import { PayloadAction } from '../../common/store/redux';
import { slugify } from '../../common/utility';

export interface Quantity {
  numerator?:   number;
  denominator:  number;
  measurement?: string;
}

export interface IngredientInput extends Partial<Quantity> {
  title:        string;

  quantity?:    string;
}

export interface IngredientDto extends Quantity {
  id:           number;
  title:        string;
}
export interface Ingredient extends IngredientDto {
  quantity?:    string;
}
export const toIngredientDto = (obj: Ingredient): IngredientDto => ({
  id:    obj.id,
  title: obj.title,

  numerator:   obj.numerator,
  denominator: obj.denominator,
  measurement: obj.measurement,
});
export const toIngredient = (dto: IngredientDto): Ingredient => ({
  id:    dto.id,
  title: dto.title,

  numerator:   dto.numerator && dto.numerator > 0 ? dto.numerator : undefined,
  denominator: dto.denominator,
  measurement: dto.measurement,
});

export interface IngredientGroupDto {
  title:       string;
  ingredients: Array<IngredientDto>;
}
export interface IngredientGroup {
  slug:        string;
  title:       string;
  ingredients: Array<Ingredient>;
}
export const toIngredientGroupDto = (obj: IngredientGroup): IngredientGroupDto => ({
  title:       obj.title,
  ingredients: obj.ingredients.map(toIngredientDto),
});
export const toIngredientGroup = (dto: IngredientGroupDto): IngredientGroup => ({
  slug:        slugify(dto.title),
  title:       dto.title,
  ingredients: dto.ingredients.map(toIngredient),
});

export interface SubRecipeDto extends Quantity {
  title:       string;
  slug:        string;
  child_recipe_id: number;
  parent_recipe_id?: number;

  measurement?: string;
}

export interface SubRecipe extends Quantity {
  title:       string;
  slug:        string;
  child_recipe_id:   number;
  parent_recipe_id?: number;
  measurement?: string;

  quantity?:   string;
}
export const toSubRecipeDto = (obj: SubRecipe): SubRecipeDto => ({
  title: obj.title,
  slug:  obj.slug,
  child_recipe_id:  obj.child_recipe_id,
  parent_recipe_id: obj.parent_recipe_id,

  measurement: obj.measurement,
  numerator:   obj.numerator,
  denominator: obj.denominator,
});
export const toSubRecipe = (dto: SubRecipeDto): SubRecipe => ({
  title: dto.title,
  slug:  dto.slug,
  child_recipe_id:  dto.child_recipe_id,
  parent_recipe_id: dto.parent_recipe_id,

  measurement: dto.measurement,
  numerator:   dto.numerator,
  denominator: dto.denominator,
});

export interface CourseDto {
  id:    number;
  title: string;
}

export type Course = CourseDto;
export const toCourse = (dto: CourseDto): Course => dto;
export const toCourseDto = (obj: Course): CourseDto => obj;

export interface CuisineDto {
  id:    number;
  title: string;
}

export type Cuisine = CuisineDto;
export const toCuisine = (dto: CuisineDto): Cuisine => dto;
export const toCuisineDto = (obj: Cuisine): CuisineDto => obj;

export interface SeasonDto {
  id:    number;
  title: string;
}

export type Season = SeasonDto;
export const toSeason = (dto: SeasonDto): Season => dto;
export const toSeasonDto = (obj: Season): SeasonDto => obj;

export interface TagDto {
  id:    number;
  title: string;
}

export type Tag = TagDto;

export const toTag = (dto: TagDto): Tag => dto;

export interface RecipeListDto {
  id:    number;
  title: string; // Tasty Chili 24
  slug:  string; // tasty-werwerchili-4

  tags?: Array<TagDto>;

  photo_thumbnail?: string | null;

  info:     string;
  rating:   number;
  rating_count: number;
  pub_date: string; // 2011-05-20
}

export type TagObj = { [key: string]: Tag };
export interface RecipeList {
  id:    number;
  title: string; // Tasty Chili 24
  slug:  string; // tasty-werwerchili-4

  tags?: Array<TagDto>;
  oTags?: TagObj;

  photoThumbnail?: string;

  info:     string;
  rating:   number;
  ratingCount: number;
  pub_date:  string; // 2011-05-20
}

export const toRecipeList = (dto: RecipeListDto): RecipeList => ({
  id:    dto.id,
  title: dto.title,
  slug:  dto.slug,

  tags:  dto.tags?.map(toTag),
  oTags: _.keyBy(dto.tags?.map(toTag) ?? [], 'title'),

  photoThumbnail: dto.photo_thumbnail ?? undefined,

  info:     dto.info,
  rating:   dto.rating,
  ratingCount: dto.rating_count,
  pub_date: dto.pub_date,
});

export interface RecipeDto extends RecipeListDto {
  source:     string;

  cook_time?: number;
  prep_time?: number;
  servings:   number;

  course?:  Course;
  cuisine?: Cuisine;
  season?:  Season;
  tags:     Array<TagDto>;

  photo?: string | null;

  subrecipes: Array<SubRecipeDto>;
  ingredient_groups: Array<IngredientGroupDto>;

  directions: string;

  public: boolean;

  author:       number;
  pub_username: string;
  update_author?:   number;
  update_username?: string;
  update_date:      string;
}

export interface Recipe extends RecipeList {
  source:      string;

  cookTime?: number;
  prepTime?: number;
  servings:  number;

  course?:  Course;
  cuisine?: Cuisine;
  season?:  Season;
  tags:     Array<Tag>;
  oTags:    TagObj;

  photo?: string;

  subrecipes: Array<SubRecipe>;
  ingredientGroups: Array<IngredientGroup>;

  directions: string;

  public: boolean;

  author:       number;
  pub_username: string;
  update_author?:   number;
  update_username?: string;
  update_date:      string;

  customServings: number;
}

export const toRecipe = (dto: RecipeDto): Recipe => ({
  id:    dto.id,
  title: dto.title,
  slug:  dto.slug,

  source:   dto.source,

  cookTime: parseBackendNumber(dto.cook_time),
  prepTime: parseBackendNumber(dto.prep_time),
  servings: dto.servings,

  course:  (dto.course == null || dto.course.title  === '-')  ? undefined : toCourse(dto.course),
  cuisine: (dto.cuisine == null || dto.cuisine.title === '-') ? undefined : toCuisine(dto.cuisine),
  season:  (dto.season == null || dto.season.title  === '-')  ? undefined : toSeason(dto.season),
  tags:    dto.tags.map(toTag),
  oTags:   _.keyBy(dto.tags.map(toTag), 'title'),

  photo: dto.photo ?? undefined,
  photoThumbnail: dto.photo_thumbnail ?? undefined,

  subrecipes: dto.subrecipes.map(toSubRecipe),
  ingredientGroups: dto.ingredient_groups.filter(ig => ig.title !== '-' && ig.ingredients.length > 0).map(toIngredientGroup),

  directions: parseBackendString(dto.directions) ?? '',
  info: dto.info,

  rating: dto.rating,
  ratingCount: dto.rating_count,
  public: dto.public,

  author:       dto.author,
  pub_username: dto.pub_username,
  pub_date:     dto.pub_date,
  update_author:   dto.update_author,
  update_username: dto.update_username,
  update_date:     dto.update_date,

  customServings: dto.servings,
});

export interface RecipeRequest {
  title:      string;

  source:     string;

  cook_time:  number | null;
  prep_time:  number | null;
  servings:   number;

  tags:       Array<TagDto>;
  course:     CourseDto | null;
  cuisine:    CuisineDto | null;
  season:     SeasonDto | null;

  subrecipes: Array<SubRecipeDto>;
  ingredient_groups: Array<IngredientGroupDto>;
  directions: string;
  info:       string;

  photo?:     '';

  public:     boolean;
}

function parseBackendNumber(val: number | undefined): number | undefined {
  if (val == null || val === NUMBER_UNDEFINED) return undefined;
  return val;
}
function parseBackendString(str: string | undefined): string | undefined {
  if (str == null || str === STRING_UNDEFINED) return undefined;
  return str;
}

const toIngredientGroupsDto = (obj: Recipe): Array<IngredientGroupDto> => {
  if (obj.ingredientGroups == null || obj.ingredientGroups.length === 0) {
    if (obj.subrecipes.length > 0) {
      return [{ title: '-', ingredients: [] }];
    } else {
      return [];
    }
  } else {
    return obj.ingredientGroups.filter(ig => ig.ingredients.length > 0).map(toIngredientGroupDto);
  }
};

function ifNull<T>(val: T | undefined, d: T): T {
  if (val == null || (typeof val === 'string' && val === '')) return d;
  return val;
}
export const toRecipeRequest = (obj: Recipe): RecipeRequest => ({
  title:      obj.title,

  source:     ifNull(obj.source, ''),

  cook_time:  obj.cookTime ?? null,
  prep_time:  obj.prepTime ?? null,
  servings:   obj.servings,

  tags:       obj.tags,
  course:     obj.course ? toCourseDto(obj.course) : {} as CourseDto,
  cuisine:    obj.cuisine ? toCuisineDto(obj.cuisine) : {} as CuisineDto,
  season:     obj.season ? toSeasonDto(obj.season) : {} as SeasonDto,

  subrecipes: obj.subrecipes?.map(toSubRecipeDto) ?? [],
  ingredient_groups: toIngredientGroupsDto(obj),
  directions: ifNull(obj.directions, ''),
  info:       ifNull(obj.info, ''),

  photo:      obj.photo === '' ? '' : undefined,

  public:     obj.public,
});

export enum RecipeActionTypes {
  RECIPE_DELETE = 'RECIPE_DELETE',
  RECIPE_INGREDIENT = 'RECIPE_INGREDIENT',
  RECIPE_INGREDIENT_SERVINGS_UPDATE = 'RECIPE_INGREDIENT_SERVINGS_UPDATE',
  RECIPE_LIST_BLANK = 'RECIPE_LIST_BLANK',
  RECIPE_LIST_LOADING = 'RECIPE_LIST_LOADING',
  RECIPE_LIST_COMPLETE = 'RECIPE_LIST_COMPLETE',
  RECIPE_LIST_ERROR = 'RECIPE_LIST_ERROR',
}

export const RECIPE_STORE = 'recipe';

export type IRecipeSlugAction = {
  store: typeof RECIPE_STORE;
  typs:  typeof RecipeActionTypes.RECIPE_DELETE;
} & PayloadAction<{ id: number }>;

export type IRecipeIngredientUpdateServingAction = {
  store: typeof RECIPE_STORE;
  typs:  typeof RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE;
} & PayloadAction<{
  recipeSlug:     string;
  customServings: number;
}>;

export type RecipeState     = ItemReducerType<Recipe>;
export type RecipeAction    = IRecipeSlugAction | IRecipeIngredientUpdateServingAction | GenericItemReducerAction<Recipe>;
export type RecipeDispatch  = ReduxDispatch<RecipeAction>;
