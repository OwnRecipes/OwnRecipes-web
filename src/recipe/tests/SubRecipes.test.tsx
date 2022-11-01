import SubRecipes from '../components/SubRecipes';
import create from '../../test/create';

import data from './data';
import { SubRecipe } from '../store/RecipeTypes';

test('Test Sub Recipes', () => {
  // const checkSubRecipe = jest.fn();
  const component = create(
    <SubRecipes subRecipes={data.subrecipes as unknown as Array<SubRecipe>} /* checkSubRecipe={checkSubRecipe} */ />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
