import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { defineMessages, useIntl } from 'react-intl';

import * as RecipeFormActions from '../store/actions';
import * as RecipeActions from '../../recipe/store/RecipeActions';
import { useDispatch } from '../../common/store/redux';
import { CombinedStore } from '../../app/Store';

import RecipeForm from '../components/RecipeForm';
import { Recipe } from '../../recipe/store/RecipeTypes';
import PageWrapper from '../../common/components/PageWrapper';
import EditGuard from '../components/EditGuard';

const RecipeFormPage: React.FC = () => {
  const intl = useIntl();
  const messages = defineMessages({
    new_recipe: {
      id: 'recipe_form.new_recipe',
      description: 'New Recipe documentTitle',
      defaultMessage: 'New Recipe',
    },
  });

  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  const fetchRecipeList = RecipeFormActions.fetchRecipeList;
  const handleSubmit = async (data: Recipe) => RecipeFormActions.save(dispatch, data);

  const recipe = useSelector((state: CombinedStore) => state.recipe.item);
  const recipeSlug = params.recipe ?? '';
  const isNew = recipeSlug === 'create';
  const paramsRecipe = params.recipe;

  // Load Recipe / or init.
  useEffect(() => {
    if (paramsRecipe) {
      window.scrollTo(0, 0);
      if (paramsRecipe === 'create') {
        dispatch(RecipeActions.reset());
      } else {
        dispatch(RecipeActions.load(paramsRecipe));
      }
    }
  }, [paramsRecipe, location.key]);

  return (
    <PageWrapper title={isNew ? intl.formatMessage(messages.new_recipe) : recipe?.title}>
      <EditGuard />
      <RecipeForm
          recipe = {isNew ? undefined : recipe}
          fetchRecipeList = {fetchRecipeList}
          onSubmit = {handleSubmit} />
    </PageWrapper>
  );
};

export default RecipeFormPage;
