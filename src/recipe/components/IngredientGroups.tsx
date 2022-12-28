import '../css/ingredients_panel.css';

import { IngredientGroup } from '../store/RecipeTypes';

import Ingredients from './Ingredients';

export interface IIngredientGroupsProps {
  groups: Array<IngredientGroup> | undefined;
  hasSubrecipes: boolean;
  withHeaderLink?: boolean;
  // checkIngredient: (id: number, checked: boolean) => void;
}

const IngredientGroups: React.FC<IIngredientGroupsProps> = ({
    groups, hasSubrecipes, withHeaderLink /* , checkIngredient */ }: IIngredientGroupsProps) => {
  const showCaptions = hasSubrecipes || (groups != null && groups.length > 1);
  const ingredientGroups = groups?.filter(group => group.title || group.ingredients.length > 0).map(group => (
    <div className='subgroup ingredient-group' key={group.title}>
      <Ingredients
          caption = {showCaptions && group.title ? group.title : undefined}
          withHeaderLink = {withHeaderLink}
          data = {group.ingredients}
          // checkIngredient = {checkIngredient}
          />
    </div>
  ));

  return (
    <>{ingredientGroups}</>
  );
};

export default IngredientGroups;
