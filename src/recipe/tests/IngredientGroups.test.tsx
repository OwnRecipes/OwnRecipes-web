import IngredientGroups from '../components/IngredientGroups';
import create from '../../test/create';

import data from './data';
import { IngredientGroup } from '../store/RecipeTypes';

test('Ingredient Group component test', () => {
  // const checkIngredient = jest.fn();
  const component = create(
    <IngredientGroups groups={data.ingredient_groups as unknown as Array<IngredientGroup>} hasSubrecipes={false} /* checkIngredient={checkIngredient} */ />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
