import { Dispatch as ReduxDispatch } from 'redux';

import { NUMBER_UNDEFINED, STRING_UNDEFINED } from '../../common/constants';
import ItemReducerType from '../../common/store/ItemReducerType';
import { GenericItemReducerAction } from '../../common/store/ReduxHelper';
import { PayloadAction } from '../../common/store/redux';

export type Quantity = {
  numerator?:   number;
  denominator:  number;
  measurement?: string;
}

export type IngredientInput = {
  title:        string;

  quantity?:    string;
} & Partial<Quantity>;

export type IngredientDto = {
  id:           number;
  title:        string;
} & Quantity;
export type Ingredient = {
  id:           number;
  title:        string;

  quantity?:    string;
} & Quantity;
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

export type IngredientGroupDto = {
  title:       string;
  ingredients: Array<IngredientDto>;
}
export type IngredientGroup = {
  slug:        string;
  title:       string;
  ingredients: Array<Ingredient>;
}
export const toIngredientGroupDto = (obj: IngredientGroup): IngredientGroupDto => ({
  title:       obj.title,
  ingredients: obj.ingredients.map(toIngredientDto),
});
export function slugify(title: string): string {
  return (title.replace(/ /g, '-').replace(/\./g, '') || 'default').toLocaleLowerCase();
}
export const toIngredientGroup = (dto: IngredientGroupDto): IngredientGroup => ({
  slug:        slugify(dto.title),
  title:       dto.title,
  ingredients: dto.ingredients.map(toIngredient),
});

export type SubRecipeDto = {
  title:       string;
  slug:        string;
  child_recipe_id: number;
  parent_recipe_id?: number;

  measurement?: string;
} & Quantity;

export type SubRecipe = {
  title:       string;
  slug:        string;
  child_recipe_id:   number;
  parent_recipe_id?: number;
  measurement?: string;

  quantity?:   string;
} & Quantity;
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

export type CourseDto = {
  id:    number;
  title: string;
}

export type Course = {
  id:    number;
  title: string;
}

export const toCourse = (dto: CourseDto): Course => ({
  id:    dto.id,
  title: dto.title,
});

export const toCourseDto = (obj: Course): CourseDto => ({
  id:    obj.id,
  title: obj.title,
});

export type CuisineDto = {
  id:    number;
  title: string;
}

export type Cuisine = {
  id:    number;
  title: string;
}

export const toCuisine = (dto: CuisineDto): Cuisine => ({
  id:    dto.id,
  title: dto.title,
});

export const toCuisineDto = (obj: Cuisine): CuisineDto => ({
  id:    obj.id,
  title: obj.title,
});

export type TagDto = {
  id:    number;
  title: string;
}

export type Tag = {
  id:    number;
  title: string;
}

export const toTag = (dto: TagDto): Tag => ({
  id:    dto.id,
  title: dto.title,
});

export type RecipeListDto = {
  id:    number;
  title: string; // Tasty Chili 24
  slug:  string; // tasty-werwerchili-4

  photo_thumbnail?: string | null;

  info:     string;
  rating:   number;
  pub_date: string; // 2011-05-20
}

export type RecipeList = {
  id:    number;
  title: string; // Tasty Chili 24
  slug:  string; // tasty-werwerchili-4

  photoThumbnail?: string;

  info:     string;
  rating:   number;
  pubDate:  string; // 2011-05-20
}

export const toRecipeList = (dto: RecipeListDto): RecipeList => ({
  id:    dto.id,
  title: dto.title,
  slug:  dto.slug,

  photoThumbnail: dto.photo_thumbnail ?? undefined,

  info:    dto.info,
  rating:  dto.rating,
  pubDate: dto.pub_date,
});

export type RecipeDto = {
  username:   string;
  author:     number;
  source:     string;

  cook_time?: number;
  prep_time?: number;
  servings:   number;

  course?:  Course;
  cuisine?: Cuisine;
  tags:     Array<TagDto>;

  photo?: string | null;

  subrecipes: Array<SubRecipeDto>;
  ingredient_groups: Array<IngredientGroupDto>;

  directions: string;

  public: boolean;
  update_date: string;
} & RecipeListDto;

export type Recipe = {
  username:    string;
  author:      number;
  source:      string;

  cookTime?: number;
  prepTime?: number;
  servings:  number;

  course?:  Course;
  cuisine?: Cuisine;
  tags:     Array<Tag>;

  photo?: string;

  subrecipes: Array<SubRecipe>;
  ingredientGroups: Array<IngredientGroup>;

  directions: string;

  public: boolean;
  updateDate: string;

  customServings: number;
} & RecipeList;

export const toRecipe = (dto: RecipeDto): Recipe => ({
  id:    dto.id,
  title: dto.title,
  slug:  dto.slug,

  username: dto.username,
  author:   dto.author,
  source:   dto.source,

  cookTime: parseBackendNumber(dto.cook_time),
  prepTime: parseBackendNumber(dto.prep_time),
  servings: dto.servings,

  course:  (dto.course == null || dto.course.title  === '-')  ? undefined : toCourse(dto.course),
  cuisine: (dto.cuisine == null || dto.cuisine.title === '-') ? undefined : toCuisine(dto.cuisine),
  tags:    dto.tags.map(toTag),

  photo: dto.photo ?? undefined,
  photoThumbnail: dto.photo_thumbnail ?? undefined,

  subrecipes: dto.subrecipes.map(toSubRecipe),
  ingredientGroups: dto.ingredient_groups.filter(ig => ig.title !== '-' && ig.ingredients.length > 0).map(toIngredientGroup),

  directions: parseBackendString(dto.directions) ?? '',
  info: dto.info,

  rating: dto.rating,
  public: dto.public,
  pubDate:    dto.pub_date,
  updateDate: dto.update_date,

  customServings: dto.servings,
});

export type RecipeRequest = {
  title:      string;

  source:     string;

  cook_time:  number | null;
  prep_time:  number | null;
  servings:   number;

  tags:       Array<TagDto>;
  course:     CourseDto | null;
  cuisine:    CuisineDto | null;

  subrecipes: Array<SubRecipeDto>;
  ingredient_groups: Array<IngredientGroupDto>;
  directions: string;
  info:       string;

  photo?:     '';

  public:     boolean;
};

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

export const RECIPE_STORE = '@@recipe';

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
