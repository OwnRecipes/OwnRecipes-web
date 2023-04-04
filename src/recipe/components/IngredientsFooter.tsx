import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import '../css/ingredients_footer.css';

import { getRoutePath, isDemoMode } from '../../common/utility';
import Icon from '../../common/components/Icon';
import ConditionalWrapper from '../../common/components/ConditionalWrapper';
import { IngredientGroup, SubRecipe } from '../store/RecipeTypes';
import AddToGroceryListModal from './AddToGroceryListModal';
import Toast from '../../common/components/Toast';

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
    add_groceries_success_toast: {
      id: 'recipe.recipe_ingredient_button.success_toast',
      description: 'Add groceries to list success toast',
      defaultMessage: 'Groceries added to the list.',
    },
  });

  const [showGroceriesModal, setShowGroceriesModal] = useState<boolean>(false);
  const handleAddGroceries = useCallback(() => {
    setShowGroceriesModal(true);
  }, []);
  const handleGroceriesModalClose = useCallback(() => {
    setShowGroceriesModal(false);
  }, []);

  const [showGroceriesSuccessToast, setShowGroceriesSuccessToast] = useState<boolean>(false);
  const handleAddToGroceryListSuccess = useCallback(() => {
    setShowGroceriesSuccessToast(true);
  }, []);
  const handleCloseAddGroceryListToast = useCallback(() => {
    setShowGroceriesSuccessToast(false);
  }, []);

  return (
    <div className='ingredients-footer print-hidden'>
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
          onSaveSuccess = {handleAddToGroceryListSuccess}
          />

      <Toast
          show = {showGroceriesSuccessToast}
          variant = 'success'
          anchorOrigin = {{ horizontal: 'center', vertical: 'bottom' }}
          onClose = {handleCloseAddGroceryListToast}>
        {formatMessage(messages.add_groceries_success_toast)}
      </Toast>
    </div>
  );
};

export default IngredientsFooter;
