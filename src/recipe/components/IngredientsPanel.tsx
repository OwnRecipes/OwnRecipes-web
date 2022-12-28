import { defineMessages, useIntl } from 'react-intl';

import '../css/ingredients_panel.css';

import { Recipe } from '../store/RecipeTypes';
import SubRecipes from './SubRecipes';
import IngredientGroups from './IngredientGroups';
// import IngredientButtons from './IngredientButtons';
import { PendingState, ReducerMeta } from '../../common/store/GenericReducerType';
import P from '../../common/components/P';
import IngredientsHeader from './IngredientsHeader';
import Loading from '../../common/components/Loading';

export interface IIngredientsPanelProps {
  recipe:      Recipe | undefined;
  recipeMeta:  ReducerMeta;

  // lists: Array<any>;

  // bulkAdd: (listId: number) => void;
  // checkAllIngredients: () => void;
  // uncheckAllIngredients: () => void;

  // checkIngredient: (id: number, checked: boolean) => void;
  // checkSubRecipe:  (id: number, checked: boolean) => void;

  updateServings: (servings: number) => void;
}

const IngredientsPanel: React.FC<IIngredientsPanelProps> = ({ recipe, recipeMeta, updateServings }: IIngredientsPanelProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    no_ingredients: {
      id: 'recipe.recipe_ingredient_button.no_ingredients',
      description: 'No ingredients provided message',
      defaultMessage: '(This recipe has no ingredients.)',
    },
  });

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
                // checkSubRecipe = {checkSubRecipe}
                />
            <IngredientGroups
                withHeaderLink
                groups  = {recipe?.ingredientGroups}
                hasSubrecipes = {recipe?.subrecipes != null && recipe?.subrecipes.length > 0}
                // checkIngredient = {checkIngredient}
                />
          </div>
          {/*
          <IngredientButtons
              pending    = {pending}
              lists      = {lists}
              bulkAdd    = {bulkAdd}
              checkAll   = {checkAllIngredients}
              unCheckAll = {uncheckAllIngredients} /> */}
        </>
      )}
    </article>
  );
};

export default IngredientsPanel;
