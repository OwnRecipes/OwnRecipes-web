import { defineMessages, useIntl } from 'react-intl';

import '../css/ingredients_panel.css';

import { Recipe } from '../store/RecipeTypes';
import { PendingState, ReducerMeta } from '../../common/store/GenericReducerType';
import P from '../../common/components/P';
import Loading from '../../common/components/Loading';
import { ValidationResult } from '../../common/store/Validation';
import SubRecipes from './SubRecipes';
import IngredientGroups from './IngredientGroups';
import IngredientsHeader from './IngredientsHeader';
import IngredientFooter from './IngredientsFooter';

const messages = defineMessages({
  no_ingredients: {
    id: 'recipe.recipe_ingredient_button.no_ingredients',
    description: 'No ingredients provided message',
    defaultMessage: '(This recipe has no ingredients.)',
  },
});

export interface IIngredientsPanelProps {
  recipe:      Recipe | undefined;
  recipeMeta:  ReducerMeta;
  userId:      number | undefined;

  updateServings: (servings: number) => Promise<ValidationResult>;
}

const IngredientsPanel: React.FC<IIngredientsPanelProps> = ({ recipe, recipeMeta, userId, updateServings }: IIngredientsPanelProps) => {
  const { formatMessage } = useIntl();

  const pending = recipeMeta.pending;
  const hasNoIngredients = pending === PendingState.COMPLETED
      && recipe?.subrecipes != null && recipe.subrecipes.length === 0
      && recipe?.ingredientGroups != null && recipe.ingredientGroups.length === 0;

  return (
    <article className='ingredients-panel'>
      <IngredientsHeader recipe={recipe} recipeMeta={recipeMeta} updateServings={updateServings} />
      {pending === PendingState.LOADING && recipe?.ingredientGroups == null && <Loading />}
      {hasNoIngredients && (
        <P className='placeholder'>{formatMessage(messages.no_ingredients)}</P>
      )}
      {!hasNoIngredients && (
        <>
          <div className='ingredient-groups'>
            <SubRecipes
                withHeaderLink
                subRecipes = {recipe?.subrecipes}
                />
            {recipe?.subrecipes && recipe?.subrecipes.length > 0 && <div className='grid-space-subrecipes' />}
            <IngredientGroups
                withHeaderLink
                groups  = {recipe?.ingredientGroups}
                hasSubrecipes = {recipe?.subrecipes != null && recipe?.subrecipes.length > 0}
                />
          </div>
          <IngredientFooter
              subrecipes = {recipe?.subrecipes}
              ingredients = {recipe?.ingredientGroups}
              isAuthenticated = {userId != null} />
        </>
      )}
    </article>
  );
};

export default IngredientsPanel;
