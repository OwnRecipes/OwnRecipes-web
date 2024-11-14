import { getEnv } from './utility';

const apiHost = getEnv('REACT_APP_API_URL', window.location.origin);
const apiUrl = `${apiHost}/api/v1`;

export const serverURLs = {
  refresh_token: `${apiUrl}/accounts/refresh-auth-token/`,
  auth_token: `${apiUrl}/accounts/obtain-auth-token/`,
  revoke_token: `${apiUrl}/accounts/revoke-auth-token/`,
  browse: `${apiUrl}/recipe/recipes/?fields=id,slug,title,pub_date,rating,rating_count,tags,photo_thumbnail,info`,
  mini_browse: `${apiUrl}/recipe/mini-browse/?fields=id,slug,title,pub_date,rating,rating_count,tags,photo_thumbnail,info`,
  course: `${apiUrl}/recipe_groups/course/`,
  course_count: `${apiUrl}/recipe_groups/course-count/`,
  cuisine: `${apiUrl}/recipe_groups/cuisine/`,
  cuisine_count: `${apiUrl}/recipe_groups/cuisine-count/`,
  season: `${apiUrl}/recipe_groups/season/`,
  season_count: `${apiUrl}/recipe_groups/season-count/`,
  ratings: `${apiUrl}/rating/rating/`,
  rating_count: `${apiUrl}/rating/rating-count/`,
  tag: `${apiUrl}/recipe_groups/tag/`,
  tag_count: `${apiUrl}/recipe_groups/tag-count/`,
  ingredient: `${apiUrl}/ingredient/ingredient/`,
  direction: `${apiUrl}/recipe/direction/`,
  news: `${apiUrl}/news/entry/`,
  recipe: `${apiUrl}/recipe/recipes/`,
  import_recipe: `${apiUrl}/recipe/import-recipe/`,
  list: `${apiUrl}/list/lists/`,
  list_item: `${apiUrl}/list/items/`,
  bulk_list_item: `${apiUrl}/list/bulk_item/`,
  menu_item: `${apiUrl}/menu/menu-item/`,
  menu_stats: `${apiUrl}/menu/menu-stats/`,
};
export default serverURLs;
