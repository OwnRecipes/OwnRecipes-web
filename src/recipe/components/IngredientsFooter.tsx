import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import '../css/ingredients_footer.css';

import { getRoutePath, isDemoMode } from '../../common/utility';
import Icon from '../../common/components/Icon';
import ConditionalWrapper from '../../common/components/ConditionalWrapper';
import { IngredientGroup, SubRecipe } from '../store/RecipeTypes';
import AddToGroceryListModal from './AddToGroceryListModal';

export interface IIngredientsFooterProps {
  subrecipes: Array<SubRecipe> | undefined;
  ingredients: Array<IngredientGroup> | undefined;
  isAuthenticated: boolean;
}

const IngredientsFooter: React.FC<IIngredientsFooterProps> = ({
    isAuthenticated, subrecipes, ingredients }: IIngredientsFooterProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    add_groceries: {
      id: 'recipe.recipe_ingredient_button.add_groceries',
      description: 'Add groceries to list',
      defaultMessage: 'Add to grocery list',
    },
  });

  const [showGroceriesModal, setShowGroceriesModal] = useState<boolean>(false);
  const handleAddGroceries = () => {
    setShowGroceriesModal(true);
  };
  const handleGroceriesModalClose = () => {
    setShowGroceriesModal(false);
  };

  return (
    <div className='ingredients-footer'>
      <ConditionalWrapper
          condition = {!isAuthenticated}
          render = {childr => <Link to={getRoutePath('/login')}>{childr}</Link>}>
        <Button onClick={handleAddGroceries} variant='primary' disabled={isDemoMode()}>
          <Icon icon='clipboard2-check' />
          {formatMessage(messages.add_groceries)}
        </Button>
      </ConditionalWrapper>

      <AddToGroceryListModal
          show = {showGroceriesModal}
          subrecipes = {subrecipes}
          ingredients = {ingredients}
          onClose = {handleGroceriesModalClose}
          />
    </div>
  );
};

export default IngredientsFooter;
