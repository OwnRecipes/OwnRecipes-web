import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { defineMessages, useIntl } from 'react-intl';

import * as RecipeFormActions from '../store/actions';
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
  const handleSubmit = useCallback(async (data: Recipe) => RecipeFormActions.save(dispatch, data), [dispatch]);

  const recipeSlug = params.recipe ?? '';
  const isNew = recipeSlug === 'create';

  const recipe = useSelector((state: CombinedStore) => state.recipeForm.item);

  // Load Recipe / or init.
  useEffect(() => {
    if (recipeSlug) {
      window.scrollTo(0, 0);
      if (recipeSlug === 'create') {
        dispatch(RecipeFormActions.reset());
      } else {
        dispatch(RecipeFormActions.load(recipeSlug));
      }
    }
  }, [recipeSlug, location.key]);

  return (
    <PageWrapper title={isNew ? intl.formatMessage(messages.new_recipe) : recipe?.title}>
      <EditGuard />
      <RecipeForm
          recipe = {recipe}
          isNew  = {isNew}
          location = {location.key}
          fetchRecipeList = {fetchRecipeList}
          onSubmit = {handleSubmit} />
    </PageWrapper>
  );
};

export default RecipeFormPage;
