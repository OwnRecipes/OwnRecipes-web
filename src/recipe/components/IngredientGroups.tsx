import '../css/ingredients_panel.css';

import { IngredientGroup } from '../store/RecipeTypes';

import Ingredients from './Ingredients';

export interface IIngredientGroupsProps {
  groups: Array<IngredientGroup> | undefined;
  hasSubrecipes: boolean;
  withHeaderLink?: boolean;
  selectable?: boolean;
}

const IngredientGroups: React.FC<IIngredientGroupsProps> = ({
    groups, hasSubrecipes, withHeaderLink, selectable }: IIngredientGroupsProps) => {
  const showCaptions = hasSubrecipes || (groups != null && groups.length > 1);
  const ingredientGroups = groups?.filter(group => group.title || group.ingredients.length > 0).map(group => (
    <div className='subgroup ingredient-group' key={group.slug || group.title}>
      <Ingredients
          showCaptions = {showCaptions}
          group = {group}
          withHeaderLink = {withHeaderLink}
          data = {group.ingredients}
          selectable = {selectable}
          />
    </div>
  ));

  return (
    <>{ingredientGroups}</>
  );
};

export default IngredientGroups;
